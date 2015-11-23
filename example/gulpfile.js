/**
 * Created by Rodey on 2015/11/6.
 */

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    reCache     = require('../index');


gulp.task('build.cache', function(){

    gulp.src('src/**/*')
        .pipe(reCache({
            //地址后面的query值
            queryKey: '_rvc_',
            //query的key值
            queryVal: '@hash',
            //生成的hash长度
            hashSize: 10,
            //将需要转出base64的img上的class类名
            toBase64: ['user-icon']
        }))
        .pipe(gulp.dest('dist'));

});


gulp.task('default', ['build.cache']);

