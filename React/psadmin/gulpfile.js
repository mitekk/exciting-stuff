"use strict";

var gulp = require('gulp');
//Runs a local dev server
var connect = require('gulp-connect');
//Open URL in a web browser
var open = require('gulp-open');
//Bundles JS
var browserify = require('browserify');
//Transforms React JSX to JS
var reactify = require('reactify');
//Use conventional text streams with Gulp
var source = require('vinyl-source-stream');
//Concatenates files
var concat = require('gulp-concat');
//Link Js files, including JSX
var lint = require('gulp-eslint');

var config = {
    port: 3000,
    devBaseUrl: "http://localhost",
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint',function(){
    return gulp.src(config.paths.js)
                .pipe(lint({config: 'eslint.config.json'}))
                .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js','lint']);
});

gulp.task('default', ['html', 'js', 'css','lint', 'open', 'watch']);
gulp.task('build', ['html', 'js', 'css','lint', 'open', 'watch']);