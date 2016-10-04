var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    less = require('gulp-less');

gulp.task('default', function () {
    gulp.src('less/header.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(cleanCss())
    gulp.src('less/insurance-add.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(cleanCss())
    gulp.src('less/insurance-list.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(cleanCss())

});

gulp.task('watch',function () {
    gulp.watch('less/header.less', ['default']);
    gulp.watch('less/insurance-add.less', ['default']);
    gulp.watch('less/insurance-list.less', ['default'])
});
