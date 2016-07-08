'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');

var conf = require('./conf');
var $ = require('gulp-load-plugins')();

var buildStyles = () => {
  var sassOptions = { style: 'expanded' };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss')
  ], { read: false });

  var injectOptions = {
    transform: (filePath) => '@import "' + filePath + '";',
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
};

gulp.task('styles-reload', ['styles'],
  () => buildStyles()
    .pipe(browserSync.stream())
);

gulp.task('styles', () => buildStyles() );
