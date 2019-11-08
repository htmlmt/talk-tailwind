'use strict';

var gulp = require('gulp');

// HTML-related
var beautifyCode = require('gulp-beautify-code');
var twig = require('gulp-twig');
var replace = require('gulp-replace');

// CSS-related
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var purgecss = require('gulp-purgecss');
var autoprefixer = require('autoprefixer');
var tailwind = require('tailwindcss');
var cleancss = require('gulp-clean-css');

// JS-related
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var eslint = require('gulp-eslint');

// Utility-related
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var open = require('gulp-open');

var localhost = 'http://0.0.0.0:8080/';
var netlify = 'https://nebraskaadmirals.netlify.com/';

var roots = {
    assets: './src/assets',
    dist: './dist',
    pages: './src/markup/pages',
    src: './src',
    tailwind: './tailwind.config.js'
};

var javascript = [
    roots.assets + '/javascript/main.js'
];

// Creates JS sourcemaps, concatenates JS files into one file based on array above, and minifies JS
gulp.task('js', function(done) {
    gulp.src(javascript)
        .pipe(eslint({
            configFile: 'package.json'
        }))
        .pipe(eslint.format())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(roots.dist + '/js'))
        .pipe(connect.reload());

    done();
});

// Creates CSS sourcemaps, converts SCSS to CSS, adds prefixes, and lints CSS
gulp.task('sass', function(done) {
    var plugins = [
        autoprefixer({grid: true}),
        tailwind(roots.tailwind)
    ];

    gulp.src(roots.assets + '/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(cleancss({compatibility: 'ie11'}))
        .pipe(purgecss({
            content: ['dist/**/*.html'],
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(roots.dist + '/css'))
        .pipe(connect.reload());

    done();
});

// Converts Twig files to HTML, properly indents HTML, and adds localhost URL to asset paths
gulp.task('markup', function(done) {
    compileMarkup();

    done();
});

// Converts Twig files to HTML, properly indents HTML, and adds Netlify URL to asset paths
gulp.task('markup-netlify', function(done) {
    var compileForNetlify = true;
    
    compileMarkup(compileForNetlify);

    done();
});

function compileMarkup(qa) {
    var domain = localhost;
    
    if (qa) {
        domain = netlify;
    }
    
    gulp.src(roots.pages + '/**/*.twig')
        .pipe(twig())
        .pipe(beautifyCode())
        .pipe(replace('href="./', 'href="' + domain))
        .pipe(replace('src="./', 'src="' + domain))
        .pipe(gulp.dest(roots.dist))
        .pipe(connect.reload());
}

// Moves images from src folder to dist folder
gulp.task('images', function(done) {
    gulp.src(roots.assets + '/images/**/*')
        .pipe(gulp.dest(roots.dist + '/images'))
        .pipe(connect.reload());

    done();
});

// Moves fonts from src folder to dist folder
gulp.task('fonts', function(done) {
    gulp.src(roots.assets + '/fonts/**/*')
        .pipe(gulp.dest(roots.dist + '/fonts'))
        .pipe(connect.reload());

    done();
});

// Runs a server to static HTML files and sets up watch tasks
gulp.task('server', function(done) {
    gulp.watch((roots.src + '/**/*.twig'), gulp.series('sass', 'markup'));
    gulp.watch((roots.assets + '/javascript/**/*.js'), gulp.series('js'));
    gulp.watch((roots.assets + '/styles/**/*.scss'), gulp.series('sass'));
    gulp.watch((roots.assets + '/images/**/*'), gulp.series('images'));
    gulp.watch((roots.assets + '/fonts/**/*'), gulp.series('fonts'));
    
    connect.server({
        root: roots.dist,
        livereload: true
    });
    
    setTimeout(function() {
        gulp.src(__filename)
            .pipe(open({uri: 'http://0.0.0.0:8080'}));
    }, 2000);

    done();
});

gulp.task('build', gulp.series('markup', 'images', 'fonts', 'js', 'sass'));

gulp.task('netlify', gulp.series('markup-netlify', 'images', 'fonts', 'js', 'sass'))

gulp.task('default', gulp.series('build', 'server'));
