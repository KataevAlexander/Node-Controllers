var fs = require('fs.extra');

var gulp = require('gulp');
var debug = require('gulp-debug');
var clean = require('gulp-clean');
var tsc = require('gulp-typescript-compiler');

var base = __dirname + '/../';
var path = {
	build: {
		base: base + 'build/target/',
		cluster: base + 'build/target/cluster',
		typings: base + 'build/target/typings/',
		application: base + 'build/target/application/'
	},

	cluster: base + 'cluster/',
	typings: base + 'typings/',
	application: base + 'application/'
};

//gulp.task('watch', function () {
//	gulp.watch(paths.application + '**/*.ts', ['application-ts']);
//});

gulp.task('default', ['backend'], function () {
});

//gulp.task('backend', ['backend-clean', 'backend-copy', 'backend-ts', 'backend-ts-clean', 'backend-swig']);
gulp.task('backend', ['backend:clear', 'backend:sync', 'backend:ts']);

gulp.task('backend:clear', function (callback) {
	fs.rmrfSync(path.build.base);

	callback();
});

gulp.task('backend:sync', ['backend:sync:cluster', 'backend:sync:application', 'backend:sync:typings']);

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

gulp.task('backend:ts', ['backend:ts:compile', 'backend:ts:clean']);

gulp.task('backend:ts:compile', ['backend:sync'], function () {
	return gulp.src(path.build.base + '**/*.ts')
		.pipe(tsc({
			resolve: true,
			module: 'commonjs',
			target: 'ES5',
			sourcemap: false,
			logErrors: true
		}))
		.pipe(gulp.dest(path.build.base));
});

gulp.task('backend:ts:clean', ['backend:ts:compile'], function () {
	return gulp.src(path.build.base + '**/*.ts', {read: false})
		.pipe(clean());
});

gulp.task('backend-swig', function () {
});

gulp.task('frontend');

gulp.task('watch', function () {
	//gulp.watch(path.application + '**/*', function(event) {
	//	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	//});

	gulp.watch(path.application + '**/*.ts', ['backend-copy', 'backend-ts']);
});

function onError(error) {
	console.log(error.toString());
	this.emit('end');
}