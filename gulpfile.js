var gulp    = require('gulp'),
    del     = require('del'),
    
    p = require('gulp-load-plugins')();

gulp.task('lint', function () {
  return gulp.src(['src/app/**/*.js'])
    .pipe(p.plumber())
    .pipe(p.standard())
    .pipe(p.standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('scripts', ['lint'], function() {
  return gulp.src('src/**/*.js')
    .pipe(p.plumber())
    .pipe(p.babel({
	  presets: ['es2015']
	}))
    .pipe(p.uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
  return del('dist/**/*')
});

gulp.task('default', ['clean'], function() {
  gulp.start('scripts');
});
