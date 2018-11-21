// Required Plugins
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

// Style Functions
var styleSRC = 'scss/app.scss';
var styleDIST = './dist/css/';
var styleWatch = 'scss/**/*.scss';

// JS Functions
var jsSRC = 'js/script.js';
var jsDIST = './dist/js/';
var jsWatch = 'js/**/*.js';

// Style Tasks
gulp.task('style', function() {
  gulp.src(styleSRC)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(styleDIST));
});

// JS Tasks
gulp.task('js', function() {
  gulp.src(jsSRC)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDIST));
});

//Image Optimization Task
gulp.task('image', () =>
    gulp.src('./dist/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
);

// Combining Tasks & make default
gulp.task('run', ['style', 'js']);

// Watch Functions
gulp.task('watch', function() {
  gulp.watch(styleWatch, ['style']);
  gulp.watch(jsWatch, ['js']);
})

// Default Gulp Task
gulp.task('default', ['run', 'watch'])


/* How to run:
-------------
1. Run "gulp" to start watching CSS & JS
2. Run "gulp image" to optimize images
*/
