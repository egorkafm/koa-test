const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const njk = require('gulp-nunjucks');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./src/public/stylesheets'));
}

// function template() {
//   return gulp.src('./src/pug/*.pug')
//     .pipe(pug({
//       pretty: true
//     }))
//     .pipe(gulp.dest('dist'))
//     .pipe(browserSync.stream());
// }

// function nunjucks() {
//   return gulp.src('./src/nunjucks/*.html')
//     .pipe(njk.compile())
//     .pipe(gulp.dest('dist'))
//     .pipe(browserSync.stream());
// }

// async function build() {
//   await style();
//   // await template();
//   await nunjucks();
// }

// function watch() {
//   browserSync.init({
//     server: {
//       baseDir: "./dist",
//       index: 'base.html'
//     }
//   });
//   gulp.watch('./src/sass/**/*.scss', style);
//   // gulp.watch('./src/pug/*.pug', template);
//   gulp.watch('./src/nunjucks/*.html', nunjucks);
// }

exports.style = style;
// exports.template = template;
// exports.build = build;
// exports.watch = watch;
// exports.nunjucks = nunjucks;
// exports.default = build;