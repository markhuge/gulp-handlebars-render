gulp-handlebars-render  [![Build Status](https://travis-ci.org/markhuge/gulp-handlebars-render.svg)](https://travis-ci.org/markhuge/gulp-handlebars-render)
=======================

> Renders handlebars templates

# Abstract

My usecase is fully rendering hbs templates with data for livereload preview. 

# Install

`npm install gulp-handlebars-render --save-dev`

# Usage

The plugin accepts a data object, which it will apply to any handlebars templates that are passed into it.

The output will be a rendered HTML file per template. 

```javascript
var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    cache      = require('gulp-cached'),
    render     = require('gulp-handlebars-render');

var content = {
  title: "Lorem ipsum dolor sit amet"
  author: "Frindle Babbin"
  content: "This is a post"
}

gulp.task('connect', function() {
  connect.server({
    root: 'build/',
    livereload: true
  });
});

gulp.task('html', function () {
 gulp.src('./src/templates/*.hbs')
    .pipe(cache('html'))
    .pipe(render(content))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});
```