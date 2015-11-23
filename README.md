# gulp-recache

## Features

+ 缓存控制更新
+ 在地址后面加上文件hash值来更新缓存

## Usage

```javascript

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

```

#License
ISC
