const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const jsmin = require('gulp-uglify-es').default
const clean = require('gulp-clean')
const avif = require('gulp-avif')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')
const browserSync = require('browser-sync').create()

function html() {
  return src('src/**.html')
    .pipe(include({ prefix: '@@' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(autoprefixer())
    .pipe(sass.sync({ outputStyle: 'compressed' }))
    .pipe(dest('dist'))
}

function js() {
  return src('src/js/**.js').pipe(jsmin()).pipe(dest('dist'))
}

function fonts() {
  return src('src/fonts/**.otf')
    .pipe(fonter({ formats: ['woff', 'ttf'] }))
    .pipe(dest('src/fonts'))
    .pipe(src('src/fonts/**.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
}

function img() {
  return src(['src/img/*.*', '!src/img/*.svg'])
    .pipe(newer('dist/img'))
    .pipe(avif({ quality: 50 }))
    .pipe(src('src/img/*.*'))
    .pipe(newer('dist/img'))
    .pipe(webp())
    .pipe(src('src/img/*.*'))
    .pipe(newer('dist/img'))
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

function clear() {
  return src('dist').pipe(clean())
}

function serve() {
  browserSync.init({ server: './dist' })
  watch('src/**.html', html).on('change', browserSync.reload)
  watch('src/scss/**.scss', scss).on('change', browserSync.reload)
  watch('src/js/**.js', js).on('change', browserSync.reload)
}

exports.build = series(html, scss, js)
exports.default = series(clear, html, scss, js, fonts, img, serve)
