import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import plumber from 'gulp-plumber';
 
const sass = gulpSass(dartSass);
 
// Manejo de rutas como constantes
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
};
 
function css() {
    return src(paths.scss, { sourcemaps: true })
        .pipe(plumber())  // Añadir plumber para manejar errores
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('./public/build/css', { sourcemaps: '.' }));
}
 
function js() {
    return src(paths.js)
        .pipe(plumber())  // Añadir plumber para manejar errores
        .pipe(terser())
        .pipe(dest('./public/build/js'));
}
 
function dev() {
    watch(paths.scss, css);
    watch(paths.js, js);
}
 
export default series(js, css, dev);