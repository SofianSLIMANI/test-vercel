const {
    stc,
    dest,
    src,
    symlink,
    parallel,
    series,
    watch
} = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Ne fonctionne pas au final malgré tous les essais
const cleanCSS = require('gulp-clean-css');

//fonction de refresh de la page web quand un changement est sauvegardé
function browserS() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch('*.html').on('change', browserSync.reload);
}

// Compilation du Scss et transformation en CSS
function sassComp() {
    return src('./sass/style.scss')
        .pipe(gulpSass())

        // Ne marche pas
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))

        .pipe(dest('./css/'))
        .pipe(browserSync.stream())
}

//Fonction qui compile le Scss en CSS dés qu'un changement est enregistré
function watcher(done) {
    watch('./sass/', sassComp)
    browserSync.reload();
    done();
}


// Exportation des fonctions
module.exports = {
    sassComp,
    watcher,
    browser: parallel(browserS, watcher),

}