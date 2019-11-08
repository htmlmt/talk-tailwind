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
