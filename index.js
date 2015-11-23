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

var PLUGIN_NAME = 'gulp-revesion';

//递归处理
var updateQuery = function(filePath, options){

    var type = F.getFileType(filePath),
        content = F.getFileContent(filePath),
        regxs = T.getRecuRegx(),
        hashSize = options.hashSize || 10,
        queryKey = options.queryKey || '_rvc_',
        queryVal = options.queryVal || '@hash',
        cls      = options.toBase64;

    //遍历正则检索
    _.each(regxs, function(item){

        content = content.replace(item, function(spec, src){

            //判断是否是网络文件
            if(/^(https*?:\/\/|about:|javascript:|data:[\s\S]*?base64)/gi.test(src)){
                return spec;
            }

            //是否已存在query
            var ms = src.split('?');
            var url = ms[0],
                query = ms[1] || '';
            //重置query key
            if(query && query === queryKey){
                queryKey = '_rvc_' + Math.random() * 100;
            }

            //获取文件hash值 | 时间戳
            var fp = path.normalize(path.dirname(filePath) + path.sep + url),
                ft = path.extname(src).replace('^.', ''),
                hash = F.getFileHash(fp, hashSize),
                time = String((new Date()).getTime()).substring(8, 13),
                rs;

            //将图片转为base64位
            var className = T.toBase64Regx.exec(spec);
            if(className && className[1]){
                var base64;
                for(var i = 0, len = cls.length; i < len; ++i){
                    if(className[1].indexOf(cls[i]) !== -1){
                        base64 = F.getFileBase64(fp);
                        break;
                    }
                }
                base64 = 'data:image/'+ ft +';base64,' + base64;
                rs = spec.replace(src, base64);
                return rs;
            }

            //拼接地址进行替换
            var qv = queryVal.replace('@hash', hash).replace('@time', time);
            qv = queryKey + '=' + qv;
            url = url + '?' + (query.length > 0 ? query + '&' : '') + qv;
            rs = spec.replace(src, url);

            return rs;

        });

    });

    return content;

};

//获取当前管道内容
var getContent = function(file, options){

    var filePath = file.path,
        type = F.getFileType(filePath);

    if(!/(html|js|css)/gi.test(type)){
        return file.contents;
    }

    var content = file.contents.toString('utf-8');
    if('undefined' === content){
        content = F.getFileContent(filePath);
    }

    //查找并替换
    content = updateQuery(filePath, options);

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