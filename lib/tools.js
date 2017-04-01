/**
 * Created by Rodey on 2015/11/14.
 */

var fs          = require('fs'),
    path        = require('path'),
    _           = require('lodash');

var Tools = {

    //匹配link tag
    linkRegx: /<link[^>]*?href=[\'"]([^\'"]*?)[\'"][^>]*?>/gi,,
    //匹配style tag
    styleRegx: /<style[^>]*?>([^<]*?)<\/style>/gi,
    //匹配script tag
    scriptRegx: /<script[^>]*?src=[\'"]([^\'"]*?)[\'"][^>]*?><\/script>/gi,
    //匹配 image tag
    imgRegx: /<img[^>]*?src=[\'"]([^\'"]*?)[\'"][^>]*?\/?>/gi,
    //匹配 audio tag
    audioRegx: /<audio\s+([^>]*?)\s*><\/audio>/gi,
    //匹配 embed tag
    embedRegx: /<embed\s+([^>]*?)\s*><\/embed>/gi,
    //匹配 video tag
    videoRegx: /<video\s+([^>]*?)\s*><\/video>/gi,

    //匹配字体文件 url
    imgUrlRegx: /url\([\'"]?([^\)]*?)[\'"]?\)/gi,

    //toBase64 img
    toBase64Regx: /class=[\'"]([^"]*?)[\'"]/gi,

    //匹配 link herf
    hrefRegx: /href=[\'"]?([^\'"]*?)[\'"]?\s*[\s\S]*?/gi,
    //匹配 src
    srcRegx: /src=[\'"]?([^\'"]*?)[\'"]?\s*[\s\S]*?/gi,

    //===============文件类型正则=
    TEXT_EXT: ['html', 'htm', 'xhtml', 'xml', 'phtml', 'php', 'txt', 'tpl', 'jsp', 'asp', 'aspx', 'json',
        'md', 'ejs', 'shtml', 'cshtml', 'tmpl', 'py', 'c', 'cs', 'h', 'cpp', 'haml', 'jade', 'conf', 'config'
    ],
    JS_EXT: ['js', 'coffe', 'ts', 'tsx', 'jsx', 'as', 'ascs', 'json', 'vm'],
    CSS_EXT: ['css', 'less', 'scss', 'styl', 'sass'],
    IMAGE_EXT: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'ico'],
    FONT_EXT: ['ttf', 'eot', 'woff', 'svg'],
    AUDIO_EXT: ['mp3', 'wav', 'ogg'],
    VIDEO_EXT: ['mpeg', 'mpeg4', 'mpeg5', 'mp4', 'mp5', 'avi', 'wma', 'webm'],

    indexOfType: function(extType){
        return this[extType].map(function(ext){
           return '.' + ext.replace(/^\./, '');
        });
    },

    //递归匹配指责集合
    getRecuRegx: function(){
        return {
            linkRegx: this.linkRegx,
            //styleRegx: this.styleRegx,
            scriptRegx: this.scriptRegx,
            imgRegx: this.imgRegx,
            audioRegx: this.audioRegx,
            videoRegx: this.videoRegx,
            embedRegx: this.embedRegx,

            imgUrlRegx: this.imgUrlRegx
        };
    },

    //跟html页面相关的正则
    getTagRegx: function(){
        return {
            linkRegx: this.linkRegx,
            styleRegx: this.styleRegx,
            scriptRegx: this.scriptRegx,
            imgRegx: this.imgRegx,
            audioRegx: this.audioRegx,
            videoRegx: this.videoRegx,
            embedRegx: this.embedRegx
        };
    },

    //有关css中相关的正则
    getCssRegx: function(){
        return {
            cssImportRegx: this.cssImportRegx,
            imgUrlRegx: this.imgUrlRegx
        };
    },

    //跟链接的正则
    getAttrRegx: function(){
        return {
            hrefRegx: this.hrefRegx,
            srcRegx: this.srcRegx
        };
    },

    //获取href地址
    getLinkUrl: function(src){
        var src = src;
        src.replace(this.hrefRegx, function($1, $2){
            src = _.trim($2);
        });

        src.replace(this.srcRegx, function($1, $2){

            src = _.trim($2);
        });
        return src;
    },

    //parse file path
    parseFile: function(file){
        var data = path.parse(file);
        return data;
    },

    /**
     * 获取get模式下url中的指定参数值
     * @param name      参数名
     * @param url       传入的url地址
     * @returns {*}
     */
    getParams: function(name, url) {
        var reg = new RegExp('(^|&)' + name + '=?([^&]*)(&|$)', 'i'), search = '';
        if(url && url !== ''){
            search = (url.split('?')[1] || '').match(reg);
        }else{
            search = window.location.search.substr(1).match(reg);
        }
        if(search && search[0].indexOf(name) !== -1) {
            return search[2] ? decodeURI(search[2]) : null;
        }
    }


};

module.exports = Tools;

