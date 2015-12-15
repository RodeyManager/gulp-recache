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
            //地址后面的query值
            queryVal: '@hash',
            //生成的hash长度
            hashSize: 10,
            //将需要转出base64的img上的class类名
            toBase64: ['to-base64'],
            //也可以在uri后面带上需要转为base64的query key, 默认 '_tobase64'
            toBase64_QK: '_tobase64',
            /**
            * 相对当前文件的toPredir路径进行查找
            * 如 当前文件路径是 project/src/views/index.html
            * 而 index.html中的 img地址都是 assets/images...的
            * views 与 assets 是同级的
            * 目录结构是这样的:
            *
            * src (源文件目录)
            *    assets
            *       css
            *       images
            *    module
            *    views
            *       index.html
            * build (编译产出目录)
            *    assets
            *       css
            *       images
            *    module
            *    index.html (注意这里的html文件不是在 views下面了)
            *
            */
            toPredir: {
                //css文件相对编译产出后的路径进行定位
                //定位后为：F:\Sites\demo\build\assets\css\app.min.css
                css: '../../build/',
                //相对当前文件的image相对路径进行定位
                //比如当前文件中的src为 assets/images/common/bg.jpg
                //定位后为：F:\Sites\demo\src\assets\images\common\bg.jpg
                image: '../'
            }
        }))
        .pipe(gulp.dest('dist'));

});

```

#License
ISC
