'use strict';

var gulp = require('gulp');
var sassLint = require('gulp-stylelint');
var path = require('path');
var tslint = require("gulp-tslint");

var conf = require('./conf');

var tsLinterSrc = [
  path.join(conf.paths.src, '**/*.ts'),
  '!' + path.join(conf.paths.src, '**/*.d.ts')
];


gulp.task('sasslint', () =>
  gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint({
      failAfterError: true,

      syntax: 'scss',
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
);

gulp.task('tslint', () =>
  gulp.src(tsLinterSrc)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
);