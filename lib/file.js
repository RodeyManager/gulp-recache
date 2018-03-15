/**
 * Created by Rodey on 2016/11/16.
 *
 * 对文件或者目录的相关操作
 */
var fs          = require('fs'),
    path        = require('path'),
    crypto      = require('crypto'),
    T           = require('./tools');



var F = {

    /**
     * 获取文件内容
     * @param file
     * @returns {string|Buffer|NodeBuffer}
     */
    getFileContent: function(file){
        var parse = path.parse(path.resolve(file));
        var dir = path.normalize(parse.dir + file);

        if(!fs.existsSync(file))    throw 'cannot find file: ' + file;
        return fs.readFileSync(file, 'utf-8');
    },

    //获取文件路径
    getFilePath: function(parentFile, file, options){
        return path.normalize(path.dirname(parentFile) + path.sep + file);
    },

    //获取文件hash值
    getFileHash: function(file, size){
        var rsPath = file.split('?')[0];
        var fileContent = F.getFileContent(rsPath);
        var fileHash = crypto.createHash('md5').update(fileContent).digest('hex').slice(0, size || 10);
        return fileHash;
    },

    //获取文件base64
    getFileBase64: function(file){
        var rsPath = file.split('?')[0];
        var base64 = fs.readFileSync(rsPath, 'base64');
        return base64;
    },

    /**
     * 获取文件大小
     * @param file
     */
    getFileSize: function(file){
        return fs.statSync(file);
    },

    //将地址后面的参数全部清楚
    replaceQuery: function(src){
        if(!src || '' === src)  return null;
        var ms = src.split('?');
        if(ms && ms[0]){
            return ms[0];
        }
        return null;
    },

    //获取文件后缀，断定文件类型
    getFileType: function(file){
        var extname = path.extname(file).split('?')[0];

        if(T.indexOfType('TEXT_EXT').indexOf(extname) > -1){
            return 'html';
        }
        else if(T.indexOfType('CSS_EXT').indexOf(extname) > -1){
            return 'css';
        }
        else if(T.indexOfType('JS_EXT').indexOf(extname) > -1){
            return 'js';
        }
        else if(T.indexOfType('IMAGE_EXT').indexOf(extname) > -1){
            return 'image';
        }
        else if(T.indexOfType('AUDIO_EXT').indexOf(extname) > -1){
            return 'audio';
        }
        else if(T.indexOfType('VIDEO_EXT').indexOf(extname) > -1){
            return 'video';
        }
        else if(T.indexOfType('FONT_EXT').indexOf(extname) > -1){
            return 'font';
        }
        else{
            return 'orther';
        }
    }

};


module.exports = F;