# gulp-dist-filter
gulp plugin for dist file filter.

## Install
```bash
npm install --save-dev https://github.com/hyrofumi/gulp-dist-filter.git
```

## Usage
Basic:

```javascript
const gulp = require('gulp');
const filter = require('gulp-dist-filter');

gulp.task('html', ['views'], () => {
  return gulp.src(['.tmp/**/*.html'])
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.'],
    }))
    .pipe(filter())
    .pipe($.if('*.js', stripDebug()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});
```

With options:

```javascript
const gulp = require('gulp');
const filter = require('gulp-dist-filter');

gulp.task('html', ['views'], () => {
  return gulp.src(['.tmp/**/*.html'])
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.'],
    }))
    .pipe(filter({
	   is_log_trace: true,
    	dist_path: 'dist',
    	html_path: '.tmp',
    }))
    .pipe($.if('*.js', stripDebug()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});
```