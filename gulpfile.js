'use strict';

// Include dependencies
var gulp = require('gulp');
var uncss = require('gulp-uncss');
var del = require('del');
var runsequence = require('run-sequence')

// Delete the output folders
gulp.task('clean', del.bind(null, ['dist']));

// Compile stylesheets
gulp.task('styles', ['clean'], function() {
  return gulp.src('app/**/*.css')
    .pipe(uncss({
      html: ['app/**/*.html'],
      ignore: [
        /\.no-/,
        /\.is-/,
        /\.has-/,
        /disabled/
      ]
    }))
    .pipe(gulp.dest('dist'));
});

// Copy over html files
gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
});

// Build production files (Default)
gulp.task('default', ['clean'], function (cb) {
  runsequence(['styles', 'copy'], cb);
});
