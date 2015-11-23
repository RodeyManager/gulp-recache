/**
 * Created by Rodey on 2015/11/14.
 */

var fs          = require('fs'),
    path        = require('path'),
    _           = require('lodash');

var Tools = {

    //匹配link tag
    linkRegx: new RegExp('<link[\\s\\S]*?href=[\\\'|"]([^"]*?)[\\\'|"]\\s*\\/>', 'gi'),
    //匹配style tag
    styleRegx: new RegExp('<style[\\s\\S]*?>([\\s\\S]*?)[\\s\\S]*?><\\/style>', 'gi'),
    //匹配script tag
    scriptRegx: new RegExp('<script[\\s\\S]*?src=[\\\'|"]([^"]*?)[\\\'|"][\\s\\S]*?></script>', 'gi'),
    //匹配 image tag
    imgRegx: new RegExp('<img[\\s\\S]*?src=[\\\'|"]([^"]*?)[\\\'|"][\\s\\S]*?\/>?', 'gi'),
    //匹配 audio tag
    audioRegx: new RegExp('<audio\\s+([\\s\\S]*?)\\s*><\\/audio>', 'gi'),
    //匹配 embed tag
    embedRegx: new RegExp('<embed\\s+([\\s\\S]*?)\\s*><\\/embed>', 'gi'),
    //匹配 video tag
    videoRegx: new RegExp('<video\\s+([\\s\\S]*?)\\s*><\\/video>', 'gi'),

    //匹配字体文件 url
    imgUrlRegx: new RegExp('url\\([\\\'|"]([\\s\\S]*?)[\\\'|"]\\)', 'gi'),

    //toBase64 img
    toBase64Regx: new RegExp('class="([^"]*?)"'),

    //匹配 link herf
    hrefRegx: new RegExp('href="([^"]*?)"\\s*[\\s\\S]*?'),
    //匹配 src
    srcRegx: new RegExp('src="([^"]*?)"+?\\s*[\\s\\S]*?'),

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
            styleRegx: this.styleRegx,
            scriptRegx: this.scriptRegx,
            imgRegx: this.imgRegx,
            audioRegx: this.audioRegx,
            videoRegx: this.videoRegx,
            embedRegx: this.embedRegx,

            imgUrlRegx: this.imgUrlRegx,
            dynamicRegx: this.dynamicRegx
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
    }


};

module.exports = Tools;

