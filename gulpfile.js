//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var notify = require("gulp-notify");
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  gulp.watch(['./www/*.html','./www/sass/my.scss','./www/js/*/js'], ['html','sasstask','scripts']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    root: 'www',
    livereload: true
  });
});
//编译sass  

gulp.task('sasstask',function(){
    gulp.src('./www/sass/my.scss')
    .pipe(sass())
      // .pipe(notify("scss build successful "))
    .pipe(gulp.dest('./www/css'));
}); 
//拼接、简化JS文件   
gulp.task('scripts',function(){
    gulp.src('./www/js/*/js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});   
// 重新加载index.html
gulp.task('html', function () {
  gulp.src('./www/*.html')
    .pipe(connect.reload());
});

//运行Gulp时，默认的Task
 gulp.task('default', ['connect', 'watch']);
