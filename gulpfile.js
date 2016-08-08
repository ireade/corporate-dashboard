/*eslint-env node */

var gulp = require('gulp');
var gutil = require('gulp-util');


/* *************
    CSS
************* */

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');

var postcssProcessors = [
    autoprefixer({
        browsers: ['last 2 versions']
    })
];

var sassMainFile = 'src/css/main.scss';
var sassFiles = 'src/css/**/*.scss';

gulp.task('css', function() {
    gulp.src(sassMainFile)
        .pipe(
            postcss(postcssProcessors, {syntax: scss})
        )
        .pipe(
            sass({ outputStyle: 'compressed' })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('public/assets/css'));
});



/* *************
    JS
************* */

var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var annotate = require('gulp-ng-annotate');

var angularFiles = 'src/js/angular/**/*.js';
var libFiles = 'src/js/lib/**/*.js';

gulp.task('js', function() {
    gulp.src(libFiles)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js/lib'));
    gulp.src(angularFiles)
        .pipe(annotate())
        .pipe(concat('angular.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js/angular'));
});






/* *************
    HTML
************* */

var minifyHTML = require('gulp-minify-html');

var htmlFiles = ['src/**/*.html'];

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest('public'));
    gulp.src('src/views/*.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest('public/views'));
    gulp.src('src/views/inc/*.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest('public/views/inc'));
    gulp.src('src/views/directives/*.html')
        .pipe(minifyHTML({ empty: true }))
        .pipe(gulp.dest('public/views/directives'));
});



/* *************
    SERVER
************* */

var browserSync = require('browser-sync');

gulp.task('connectWithBrowserSync', function() {

    browserSync.create();
    browserSync.init({
        server: './public',
        port: 9997
    });

});



    



/* *************
    WATCH
************* */

gulp.task('watch', function() {
    gulp.watch(sassFiles,['css']).on('change', browserSync.reload); 
    gulp.watch(angularFiles,['js']).on('change', browserSync.reload); 
    gulp.watch(libFiles,['js']).on('change', browserSync.reload); 
    gulp.watch(htmlFiles, ['html']).on('change', browserSync.reload); 
});



/* *************
    DEFAULT
************* */

gulp.task('default', ['connectWithBrowserSync', 'css', 'js', 'html', 'watch']);
