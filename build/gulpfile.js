var fs = require('fs.extra');

var gulp = require('gulp');
var clean = require('gulp-clean');
var tsc = require('gulp-typescript');

var base = __dirname + '/../';
var path = {
	build: {
		base: base + 'build/target/',
		cluster: base + 'build/target/cluster/',
		typings: base + 'build/target/typings/',
		application: base + 'build/target/application/',
		modules: base + 'build/target/node_modules/'
	},

	cluster: base + 'cluster/',
	typings: base + 'typings/',
	application: base + 'application/',
	modules: base + 'node_modules/'
};

gulp.task('default', ['backend', 'frontend'], function () {
});

gulp.task('backend', ['backend:clear', 'backend:sync', 'backend:ts']);
gulp.task('backend:sync', ['backend:sync:cluster', 'backend:sync:application', 'backend:sync:typings', 'backend:sync:modules']);
gulp.task('backend:ts', ['backend:ts:compile', 'backend:ts:clean']);

gulp.task('backend:clear', function (callback) {
	fs.rmrfSync(path.build.base);
	//fs.rmrfSync(path.build.base.application);
	//fs.rmrfSync(path.build.base.cluster);

	callback();
});

gulp.task('backend:sync:cluster', function () {
	return gulp.src([path.cluster + '**'])
		.pipe(gulp.dest(path.build.cluster));
});

gulp.task('backend:sync:application', function () {
	return gulp.src([path.application + '**'])
		.pipe(gulp.dest(path.build.application));
});

gulp.task('backend:sync:typings', function () {
	return gulp.src(path.typings + '**')
		.pipe(gulp.dest(path.build.typings));
});

gulp.task('backend:sync:modules', function () {
	return gulp.src(path.modules + '**')
		.pipe(gulp.dest(path.build.modules));
});

gulp.task('backend:ts:compile', ['backend:sync'], function () {
	var options = {
		removeComments: true,
		noLib: true,
		target: 'ES5',
		module: 'commonjs',
		noExternalResolve: true
	};

	gulp.src([path.build.application + '**/*.ts'])
		.pipe(tsc(options)).js.pipe(gulp.dest(path.build.application));

	return gulp.src([path.build.cluster + '**/*.ts'])
		.pipe(tsc(options)).js.pipe(gulp.dest(path.build.cluster));
});

gulp.task('backend:ts:clean', ['backend:ts:compile'], function () {
	return gulp.src([path.build.base + '**/*.ts', path.build.typings + '**'], {read: false})
		.pipe(clean());
});

gulp.task('frontend');

gulp.task('watch', function () {
	gulp.watch([path.application + '**/*.ts', path.cluster + '**/*.ts'], ['backend:ts']);
});