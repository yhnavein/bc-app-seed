'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var conf = require('./conf');
// var debug = require('gulp-debug');

var $ = require('gulp-load-plugins')();

gulp.task('partials', ['clean'], function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.serve, '/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'templates',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('assets', ['clean'], function () {
  return gulp.src([ path.join(conf.paths.base, '/assets/**'), path.join(conf.paths.src, '/assets/**') ])
    .pipe(gulp.dest(conf.paths.dist + '/assets/'));
});

gulp.task('html', ['clean', 'inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.serve, '/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.replace('../../node_modules/font-awesome/fonts', '../fonts/'))
    .pipe($.replace('../../node_modules/country-flags-sass', '../assets/'))
    // .pipe($.sourcemaps.init())
    .pipe($.cssnano())
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

gulp.task('fonts', ['clean'], function () {
  return gulp.src(['node_modules/font-awesome/fonts/**'])
    .pipe($.filter('*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('components-copy', ['clean', 'other'], function () {
  return gulp.src('node_modules/country-flags-sass/**/*', { follow: true })
    .pipe($.filter('**/*.{png,jpg}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/')));
});

gulp.task('other', ['clean'], function () {
  var fileFilter = $.filter( (file) => file.stat.isFile() );

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,ts}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/partials'),
    path.join(conf.paths.serve, '/')
  ]);
});

gulp.task('build', ['clean', 'html', 'assets', 'fonts', 'components-copy', 'other', 'tslint']);
