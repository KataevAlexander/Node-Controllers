var gulp = require('gulp');
var concat = require('gulp-concat');
var tsc = require('gulp-tsc');
var uglify = require('gulp-uglify');

var base = './../';
var path = {
	build: {
		base: base + 'build/target/',
		js: base + 'build/target/static/js/'
	},

	
	js: base + 'static/js/'
};

gulp.task('frontend:default', ['frontend:ts:internal', 'frontend:ts:external'], function() {

});

gulp.task('frontend:ts:internal', function () {
	return gulp.src(path.js + '**/*.ts')
		.pipe(tsc({
			module: 'amd',
			target: 'ES5',
			removeComments: true
		}))
		.pipe(concat('internal.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('frontend:ts:external', function () {
	gulp.src(path.js + 'vendor/require.js')
		.pipe(gulp.dest(path.build.js));
	
	return gulp.src([path.js + 'vendor/**', '!' + path.js + 'vendor/require.js'])
		.pipe(concat('external.js'))
		.pipe(gulp.dest(path.build.js));
});

module.exports = gulp;