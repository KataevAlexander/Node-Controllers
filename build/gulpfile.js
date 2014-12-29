var gulp = require('gulp');
var tsc = require('gulp-tsc');
var clip = require('gulp-clip-empty-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var install = require("gulp-install");
var clean = require("gulp-clean");

var fs = require('fs.extra');

var LessPluginCleanCSS = require("less-plugin-clean-css");
var cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix();

var base = './../';
var path = {
	build: {
		base: base + 'build/target/',
		application: base + 'build/target/application/',
		cluster: base + 'build/target/cluster/',
		'public': base + 'build/target/',
		'static': base + 'build/target/'
	},

	application: base + 'application/',
	cluster: base + 'cluster/',
	typings: base + 'typings/',
	'public': base + 'public/',
	'static': base + 'static/'
};

// default

gulp.task('default', ['application', 'cluster', 'public', 'static', 'modules'], function () {
	console.log('all build');
});

// all

gulp.task('application', ['application:clear', 'application:views', 'application:compile']);
gulp.task('cluster', ['cluster:clear', 'cluster:sync']);
//gulp.task('common', []);
gulp.task('public', ['public:clear', 'public:sync']);
gulp.task('static', ['static:clear', 'static:css', 'static:img', 'static:js:require', 'static:js:application', 'static:js:vendor']);

// application

gulp.task('application:clear', function () {
	fs.rmrfSync(path.build.application);
});

gulp.task('application:views', function () {
	return gulp.src(path.application + 'views/**')
		.pipe(gulp.dest(path.build.application + '/views/'));
});

gulp.task('application:compile', function () {
	return gulp.src([path.application + '**/*.ts', path.typings + 'backend/typings/tsd.d.ts'])
		.pipe(tsc({
			module: 'commonjs',
			target: 'ES5',
			removeComments: true
		}))
		.pipe(clip())
		.pipe(gulp.dest(path.build.application));
});

// cluster

gulp.task('cluster:clear', function () {
	fs.rmrfSync(path.build.cluster);
});

gulp.task('cluster:sync', function () {
	return gulp.src(path.cluster + '**')
		.pipe(gulp.dest(path.build.cluster));
});

// public

gulp.task('public:clear', function () {
	fs.rmrfSync(path.build.public);
});

gulp.task('public:sync', function () {
	return gulp.src(path.public + '**')
		.pipe(gulp.dest(path.build.public));
});

// static

gulp.task('static:clear', function () {
	fs.rmrfSync(path.build.static + '/css/');
	fs.rmrfSync(path.build.static + '/img/');
	fs.rmrfSync(path.build.static + '/js/');
});

gulp.task('static:css', function () {
	return gulp.src(path.static + 'css/**')
		.pipe(less({
			plugins: [cleancss, autoprefix]
		}))
		.pipe(gulp.dest(path.build.static + '/css/'));
});

gulp.task('static:img', function () {
	return gulp.src(path.static + 'img/**')
		.pipe(gulp.dest(path.build.static + '/img/'));
});

gulp.task('static:js:require', function () {
	return gulp.src(path.static + 'js/vendor/require.js')
		.pipe(gulp.dest(path.build.static + '/js/'));
});

gulp.task('static:js:application', function () {
	return gulp.src(path.static + 'js/**/*.ts')
		.pipe(tsc({
			module: 'amd',
			target: 'ES5',
			removeComments: true
		}))
		.pipe(concat('application.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.static + 'js/'));
});

gulp.task('static:js:vendor', function () {
	return gulp.src([path.static + 'js/vendor/**', '!' + path.static + 'js/vendor/require.js'])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(path.build.static + '/js/'));
});

// modules

gulp.task('modules', function () {
	return gulp.src(base + 'package.json')
		.pipe(gulp.dest(path.build.base))
		.pipe(install({
			production: true
		}));
});

//watchers

gulp.task('watch', function () {
	gulp.watch([path.application + '**/*.ts'], ['application:compile']);
});