/**
 * Created by Rodey on 2015/11/6.
 */

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    reCache     = require('../index');


gulp.task('build.cache', function(){

    gulp.src('src/**/*')
        .pipe(reCache({
            //query的key值
            queryKey: '_rvc_',
            //地址后面的query值
            queryVal: '@hash',
            //生成的hash长度
            hashSize: 10,
            //将需要转出base64的img上的class类名
            toBase64: ['user-icon'],
            //也可以在uri后面带上需要转为base64的query key, 默认 '_tobase64'
            toBase64_QK: '_tobase64'
        }))
        .pipe(gulp.dest('dist'));

});


gulp.task('default', ['build.cache']);

