"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});


gulp.task("images", function () {
  return gulp
    .src(["source/img/**/*.{png,jpg}", "source/img/*.svg"])
    .pipe(
      imagemin([
        imagemin.optipng({ optomozationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )

    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp
    .src(["source/fonts/*.{woff,woff2}"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch(
    "source/img/content/*.svg",
    gulp.series("html", "refresh")
  );
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task(
  "build",
  gulp.series("clean", "copy", "css", "images", "html")
);
gulp.task("start", gulp.series("build", "server"));
