var
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  gulpsync = require('gulp-sync')(gulp),
  scss = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  // JAVASCRIPT
  concat = require('gulp-concat')
  watch = require('gulp-watch');

  gulp.task('connect', function() {
    connect.server ({
      port: 3000,
      livereload: true,
    });
  });

  gulp.task('html', function(){
    gulp.src('index.html')
      .pipe(plumber())
      .pipe(connect.reload());
  });

  gulp.task('scss', function () {
    return scss(['developer/stylesheets/app.stylesheets.scss'], { 
      sourcemap: true,
      style: 'compact',
      compass: true
      })
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(autoprefixer({
          browsers: ['last 10 versions', '> 1%', 'ie 8', 'ie 9', 'ie 10', 'ie 11'],
          cascade: false
        }))
      .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'source'
      }))
      .pipe(gulp.dest('assets/stylesheets/'))
      .pipe(connect.reload());
  });
  // ===========
  // JAVASCRIPTS
  // ===========

  var path = "./developer/javascripts/";

  var javascripts = [
  
    path + "gallery/plugins/jquery.mousewheel.min.js",
    path + "gallery/plugins/lightgallery-all.min.js",
    path + "gallery/plugins/masonry.pkgd.min.js",
    path + "gallery/plugins/imagesloaded.pkgd.min.js",
    path + "gallery/gallery.init.js",

    path + "fastclick/plugins/fastclick.js",
    path + "fastclick/fastclick.init.js",
  ]

  gulp.task('javascript', function () {
    return gulp.src(javascripts)
      .pipe(sourcemaps.init())
        .pipe(concat('application.build.js'))
      .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'source'
      }))
      .pipe(gulp.dest('assets/javascripts/'))
      .pipe(connect.reload());
  });

  gulp.task('watch', function() {
    gulp.watch('developer/stylesheets/**/*', ['scss']);
    gulp.watch('*.html', ['html']);
    gulp.watch('developer/javascripts/**/*.js', ['javascript']);
  });
  gulp.task('default', gulpsync.sync([
    [
      'scss',
      'javascript'
    ],
    'connect',
    'watch'
  ]));