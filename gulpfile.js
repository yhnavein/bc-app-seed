'use strict';

var gulp = require('gulp');
var fs = require('fs');

var taskListing = require('gulp-task-listing');

gulp.task('help', taskListing);

/**
 *  This will load generic gulp tasks
 */
readDirSync('./base/gulp')
	.filter( (file) => (/\.(js)$/i).test(file) )
	.forEach( (file) => { require('./base/gulp/' + file); } );

/**
 *  This will load app-specific gulp tasks
 */
readDirSync('./src/gulp')
	.filter( (file) => (/\.(js)$/i).test(file) )
	.forEach( (file) => { require('./src/gulp/' + file); } );

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', () =>  gulp.start('build') );


function readDirSync(path) {
	try {
		return fs.readdirSync(path)
			.filter((file) => fs.statSync(path + '/' + file).isFile());
	} catch (e) {
		return [];
	}
}
