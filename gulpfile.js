// gulpfile.js
var gulp = require("gulp");
var server = require("gulp-express");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var babel = require("gulp-babel");

var argv = require("minimist")(process.argv.slice(2));
var env = argv.e; //gulp server -e build  -e后面的值

gulp.task("styles", function() {
  return (
    gulp
      .src("src/scss/**/*.scss")
      .pipe(gulpif(env != "build", sourcemaps.init()))
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(gulpif(env != "build", sourcemaps.write()))

      // auto prefix
      .pipe(
        autoprefixer(
          "last 2 version",
          "safari 5",
          "ie 9",
          "opera 12.1",
          "ios 6",
          "android 4"
        )
      )
      .pipe(
        gulp.dest(function(file) {
          return "./public/css/";
        })
      )
  );
});

gulp.task("jshint", function() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulpif(env != "build", sourcemaps.init()))
    .pipe(uglify())
    .pipe(gulpif(env != "build", sourcemaps.write()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/js/"));
});

gulp.task("api", function() {
  return gulp
    .src("api/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["@babel/plugin-transform-runtime"]
      })
    )
    .pipe(gulp.dest("./bin"));
});

gulp.task("img", function() {
  return gulp
    .src("src/images/**/*")
    .pipe(gulp.dest("./public/images/"))
    .pipe(
      notify(function(file) {
        return "img copy done！";
      })
    );
});

gulp.task("clean", function() {
  return gulp.src("./public**").pipe(clean());
});

gulp.task("default", ["styles", "jshint", "api", "img"]);

gulp.task("server", ["default"], function() {
  server.run(["./bin/app.js"]);

  gulp.watch(["src/scss/**/*.scss"], ["styles"]);
  gulp.watch(["src/js/**/*.js"], ["jshint"]);
  gulp.watch(["src/images/**/*"], ["img"]);
  gulp.watch(["api/**/*.js"], ["api"]);

  gulp.watch(["bin/**/**/.js"], [server.run]);
  gulp.watch(["views/**/*.html"], server.notify);
  gulp.watch(["public/images/**/*"], server.notify);
  gulp.watch(["public/css/**/*.css"], server.notify);
  gulp.watch(["public/js/**/*.js"], server.notify);
});
