/**
 * Created by Rodey on 2015/11/5.
 */

var fs          = require('fs'),
    path        = require('path'),
    through2    = require('through2'),
    PluginError = require('gulp-util').PluginError,
    F           = require('./lib/file'),
    T           = require('./lib/tools'),
    _           = require('lodash');

var PLUGIN_NAME = 'gulp-recache';

//递归处理
var updateQuery = function(filePath, content, options){

    var content     = content || F.getFileContent(filePath),
        regxs       = T.getRecuRegx(),
        hashSize    = options.hashSize || 10,
        queryKey    = options.queryKey || '_rvc_',
        queryVal    = options.queryVal || '@hash',
        b64_qk      = options.toBase64_QK || '_tobase64',
        queryKeyRegx = new RegExp(queryKey + '=?[^\&]*?', 'gi'),
        basePath    = options['basePath'] || '',
        toPredir    = options['toPredir'] || {},
        imagePd     = toPredir['image'] || '',
        cssPd       = toPredir['css'] || '',
        jsPd        = toPredir['js'] || '';

    //遍历正则检索
    _.each(regxs, function(item){

        content = content.replace(item, function(spec, src){
            //console.log('spec: ', spec);

            if(!src || '' === src){
                return '';
            }
            //判断是否是网络文件
            if(/^(https*?:\/\/|about:|javascript:|data:|<%|\{)/gi.test(src)){
                return spec;
            }

            //获取文件类型
            var type = F.getFileType(src);

            //是否已存在query
            var ms = src.split('?');
            var url = ms[0],
                query = ms[1] || '';
            //重置query key
            if(query && query === queryKey){
                queryKey = queryKey + Math.random() * 100;
            }

            //获取文件hash值 | 时间戳
            var fp;
            if('css' === type){
                //fp = path.normalize(path.dirname(filePath) + path.sep + cssPd + url);
                fp = _getPath(url, cssPd);
            }
            else if('image' === type){
                //fp = path.normalize(path.dirname(filePath) + path.sep + imagePd + url);
                fp = _getPath(url, imagePd);
            }
            else if('js' === type){
                //fp = path.normalize(path.dirname(filePath) + path.sep + jsPd + url);
                fp = _getPath(url, jsPd);
            }
            else{
                //fp = path.normalize(path.dirname(filePath) + path.sep + url);
                fp = _getPath(url, '');
            }
            function _getPath(url, predir){
                if(basePath && '' !== basePath){
                    fp = path.resolve(basePath, url.replace(/^[.\/]+/gi, ''));
                }else{
                    fp = path.normalize(path.dirname(filePath) + path.sep + predir + url);
                }
                return fp;
            }
            //console.log('spec: ', spec);
            //console.log('src: ', src);
            //console.log('fp: ', fp);
            if(!fp || !fs.existsSync(fp)){
                return spec;
            }
            var hash = F.getFileHash(fp, hashSize),
                time = String((new Date()).getTime()).substring(8, 13),
                rs, ft, base64;

            //将图片转为base64位
            if(T.getParams(b64_qk, src) !== undefined){

                ft = path.extname(src).replace(/^./i, '').split('?')[0];
                base64 = F.getFileBase64(fp);
                if(base64){
                    base64 = 'data:image/'+ ft +';base64,' + base64;
                    rs = spec.replace(src, base64);
                    return rs;
                }
            }

            //拼接地址进行替换
            var qv = queryVal.replace('@hash', hash).replace('@time', time);
            qv = queryKey + '=' + qv;
            if(query.length > 0 && queryKeyRegx.test(query)){
                query = query.replace(queryKeyRegx, '');
            }
            url = url + '?' + (query.length > 0 ? query.replace(/\&$/i, '') + '&' + qv : qv);
            rs = spec.replace(src, url);
            //console.log(url);
            return rs;

        });

    });

    return content;

};

//获取当前管道内容
var getContent = function(file, options){

    var filePath = file.path,
        type = F.getFileType(filePath);

    if(!/(html|css)/gi.test(type)){
        return file.contents;
    }
    //console.log(filePath);

    var content = file.contents.toString('utf-8');
    if('undefined' === content){
        content = F.getFileContent(filePath);
    }

    //查找并替换
    content = updateQuery(filePath, content, options);

    return content;

};


//将压缩后的内容替换到html中
var reCache = function(options){
    var options = options || {};

    return through2.obj(function(file, enc, next){

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Stream content is not supported'));
            return next(null, file);
        }
        if (file.isBuffer()) {
            try {
                var content = getContent(file, options);
                //console.log(content);
                file.contents = new Buffer(content);
            }
            catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, ''));
            }
        }
        this.push(file);
        return next();


    });

};

module.exports = reCache;