var gulp = require('gulp');
var fs = require('fs.extra');

var common = require('../common/build/gulpfile');
var backend = require('../backend/build/gulpfile');
var frontend = require('../frontend/build/gulpfile');

var base = './../';
var path = {
	build: {
		base: base + 'build/target',
		backend: base + 'build/target/'
	},
	
	backend: base + 'backend/build/target/'
};

gulp.task('default', ['clean', 'sync'], function () {
	console.log('all build');
});

gulp.task('clean', function () {
	fs.rmrfSync(path.build.base);
});

gulp.task('sync', ['sync:backend']);

gulp.task('sync:backend', ['backend:default'], function () {
	return gulp.src(path.backend + '**')
		.pipe(gulp.dest(path.build.backend));
});