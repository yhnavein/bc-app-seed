'use strict';

var path = require('path');
var gulp = require('gulp');
var util = require('util');
var conf = require('./conf');

var browserSync = require('browser-sync');

function getRoutes(baseDir) {
  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/node_modules': 'node_modules'
    };
  }

  return routes;
}

function browserSyncInit(baseDir, browser) {
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: {
      baseDir: baseDir,
      routes: getRoutes(baseDir)
    },
    browser: browser || 'default',
    online: false
  });
}

gulp.task('serve', ['watch'], () => browserSyncInit([conf.paths.serve, conf.paths.src, conf.paths.base]) );

gulp.task('serve:dist', ['build'], () => browserSyncInit(conf.paths.dist) );

gulp.task('serve:e2e', ['inject'], () => browserSyncInit([conf.paths.serve, conf.paths.src, conf.paths.base], []) );

gulp.task('serve:e2e-dist', ['build'], () => browserSyncInit(conf.paths.dist, []) );



gulp.task('watch', ['scripts:watch', 'inject'], () => {
  gulp.watch([path.join(conf.paths.src, '/*.html')], ['inject-reload']);

  gulp.watch(path.join(conf.paths.src, '/**/*.scss'), (event) => {
    const mode = (event.type === 'changed' ? 'styles' : 'inject');
    gulp.start(mode + '-reload');
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'),
    (event) => browserSync.reload(event.path)
  );
});
