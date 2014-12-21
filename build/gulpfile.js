var gulp = require('gulp');

var common = require('../common/build/gulpfile');
var backend = require('../backend/build/gulpfile');
var frontend = require('../frontend/build/gulpfile');

gulp.task('default', ['common:default', 'backend:default', 'frontend:default'], function () {
	console.log('all build');
});