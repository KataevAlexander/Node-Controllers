var gulp = require('gulp');
var fs = require('fs.extra');

var common = require('../common/build/gulpfile');
var backend = require('../backend/build/gulpfile');
var frontend = require('../frontend/build/gulpfile');

var base = './../';
var path = {
	build: {
		base: base + 'build/target/',
		modules: base + 'build/target/node_modules/',
		backend: base + 'build/target/',
		frontend: base + 'build/target/'
	},

	modules: base + 'node_modules',
	backend: base + 'backend/build/target/',
	frontend: base + 'frontend/build/target/'
};

gulp.task('default', ['clean', 'sync'], function () {
	console.log('all build');
});

gulp.task('clean', function () {
	fs.rmrfSync(path.build.base);
});

gulp.task('sync', ['sync:modules', 'sync:backend', 'sync:frontend']);

gulp.task('sync:modules', function () {
	return gulp.src([path.modules + 'express/**', path.modules + 'fs.extra/**', path.modules + 'swig/**'])
		.pipe(gulp.dest(path.build.modules));
});

gulp.task('sync:backend', ['backend:default'], function () {
	return gulp.src(path.backend + '**')
		.pipe(gulp.dest(path.build.backend));
});

gulp.task('sync:frontend', ['frontend:default'], function () {
	return gulp.src(path.frontend + '**')
		.pipe(gulp.dest(path.build.frontend));
});