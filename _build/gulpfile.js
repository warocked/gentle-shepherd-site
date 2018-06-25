// include gulp
var gulp = require('gulp'); 
//jshint
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
//imgs
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

// js files
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
// css files
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*',
      imgDst = './build/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

  // minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(htmlmin({collapseWhitespace: false}))
    .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(['./src/js/*.js'])
    .pipe(concat('main.js'))
    // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    // .pipe(concat('styles.css'))
    // .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});


// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  // gulp.watch('./src/js/*.js', function() {
  //   gulp.run('jshint', 'scripts');
  // });

  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });
});