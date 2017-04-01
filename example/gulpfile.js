/**
 * Created by Rodey on 2015/11/6.
 */

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    reCache     = require('../index');

var config = require('../package.json');


gulp.task('build.cache', function(){

    gulp.src('src/**/*')
        .pipe(reCache({
            //query的key值
            queryKey: '_rvc_',
            //地址后面的query值
            queryVal: '@hash', // + '_' + config.version,
            //生成的hash长度
            hashSize: 10,
            //也可以在uri后面带上需要转为base64的query key, 默认 '_tobase64'
            // toBase64_QK: '_tobase64',
            toBase64Limit: 1000
        }))
        .pipe(gulp.dest('dist'));

});


gulp.task('default', ['build.cache']);

