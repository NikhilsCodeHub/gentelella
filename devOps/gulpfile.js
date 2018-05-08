var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        startPath: 'DevOpsDash/devOps/index.html'
    });
});

var DEST = '.';

gulp.task('scripts', function() {
    return gulp.src([
        'js/custom.js',
      ])
      .pipe(concat('custom.js'))
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('*.html', browserSync.reload);
  // Watch .js files
  gulp.watch('js/custom.js', ['scripts']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch', 'scripts']);
