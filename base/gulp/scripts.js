'use strict';

const gulp = require('gulp');

const ngAnnotate = require('gulp-ng-annotate');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const util = require('gulp-util');
const browserify = require('browserify');
const tsify = require('tsify');

const tsFilesPattern = 'src/**/*.ts';

var handleScripts = (tsFilter) => {
  var entries = ['src/app/index.module.ts'];
  if(tsFilter)
    entries.push(tsFilter);

  return browserify({
      basedir: '.',
      debug: true,
      entries: entries,
      cache: {},
      packageCache: {}
    })
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on('error', util.log)
    .pipe(source('index.module.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('.tmp/serve/app/'));
};

gulp.task('scripts', ['tslint'],
  () => handleScripts()
);

gulp.task('scripts:watch', ['scripts'],
  () => gulp.watch(tsFilesPattern, ['scripts'], browserSync.reload)
);