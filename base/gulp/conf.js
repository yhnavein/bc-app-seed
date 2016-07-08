
/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  base: 'base',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  serve: '.tmp/serve'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  var gutil = require('gulp-util');

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
