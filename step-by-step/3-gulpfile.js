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
