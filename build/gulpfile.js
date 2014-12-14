var gulp = require('gulp');
var tsc = require('gulp-typescript-compiler');
var clean = require('gulp-clean');

gulp.task('clean-node', function () {
    return gulp.src('./target/*')
        .pipe(clean({
            read: false
        }));
});

gulp.task('node', ['clean-node'], function () {
    return gulp.src(['../application/**/*.ts', '!../application/refs.ts'])
        .pipe(tsc({
            //resolve: true,
            module: 'commonjs',
            target: 'ES5',
            sourcemap: false,
            logErrors: true
        }))
        .pipe(gulp.dest('./target/application/'));
});

gulp.task('default', ['node'], function () {

});