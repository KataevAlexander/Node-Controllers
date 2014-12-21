var fs = require('fs.extra');

var gulp = require('gulp');
var clean = require('gulp-clean');
var tsc = require('gulp-tsc');

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

gulp.task('backend:default', ['backend:clear', 'backend:sync', 'backend:ts'], function () {
	console.log('backend ok');
});

gulp.task('backend:sync', ['backend:sync:cluster', 'backend:sync:application', 'backend:sync:typings', 'backend:sync:modules']);
gulp.task('backend:ts', ['backend:ts:compile', 'backend:ts:clean']);

gulp.task('backend:clear', function (callback) {
	fs.rmrfSync(path.build.base);

	if (fs.existsSync(path.build.application)) {
		fs.rmrfSync(path.build.application);
	}

	if (fs.existsSync(path.build.cluster)) {
		fs.rmrfSync(path.build.cluster);
	}

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
	return gulp.src([path.build.application + '**/*.ts', path.build.cluster + '**/*.ts', path.build.typings + 'refs.ts'])
		.pipe(tsc({
			module: 'commonjs',
			target: 'ES5',
			removeComments: true
		}))
		.pipe(gulp.dest(path.build.base));
});

gulp.task('backend:ts:clean', ['backend:ts:compile'], function () {
	return gulp.src([path.build.base + '**/*.ts', path.build.typings + '**'], {read: false})
		.pipe(clean({
			force: true
		}));
});

gulp.task('watch', function () {
	gulp.watch([path.application + '**/*.ts', path.cluster + '**/*.ts'], ['backend:ts']);
});

module.exports = gulp;