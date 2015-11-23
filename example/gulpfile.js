/**
 * Created by Rodey on 2015/11/6.
 */

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    reCache     = require('../index');


gulp.task('build.cache', function(){

    gulp.src('src/**/*')
        .pipe(reCache({
            //��ַ�����queryֵ
            queryKey: '_rvc_',
            //query��keyֵ
            queryVal: '@hash',
            //���ɵ�hash����
            hashSize: 10,
            //����Ҫת��base64��img�ϵ�class����
            toBase64: ['user-icon']
        }))
        .pipe(gulp.dest('dist'));

});


gulp.task('default', ['build.cache']);

