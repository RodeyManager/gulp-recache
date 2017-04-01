# gulp-recache

## Features

+ 缓存控制更新
+ 在地址后面加上文件hash值来更新缓存

## Usage

```javascript

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    reCache     = require('gulp-recache');

gulp.task('build.cache', function(){

    gulp.src('src/**/*')
        .pipe(reCache({
            //query的key值
            queryKey: '_rvc_',
            queryVal: '@hash',
            hashSize: 10,
            // toBase64_QK: '_tobase64',
            toBase64Limit: 1000,
            basePath: 'D:/Sites/GitHub/me/gulp-recache/example'
        }))
        .pipe(gulp.dest('dist'));

});

```

## Options
    + queryKey      ：query的key值，默认 '_rvc_'
    + queryVal      ：地址后面的query值，默认 '@hash'(填充文件MD5值)
    + hashSize      ：生成的hash长度
    + toBase64_QK   ：可以在uri后面带上需要转为base64的query key, 默认 '_tobase64'
    + toBase64Limit : 限制转base64的图片大小，默认为1000（字节）
    + basePath      ：资源根路径

#License
ISC
