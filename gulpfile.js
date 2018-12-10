
const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const connect = require("gulp-connect");
gulp.task("html",()=>{
      // gulp.src("./src/pages/index.html").pipe(gulp.dest("./dist/"));
      // gulp.src(["./src/pages/index.html","./src/pages/list.html"]).pipe(gulp.dest("./dist/"));
      // gulp.src("./src/pages/*.html").pipe(gulp.dest("./dist/"));
      return  gulp.src(["./src/pages/*.html","!./src/pages/mySecret.html"]).pipe(gulp.dest("./dist/pages")).pipe(connect.reload());
})
      gulp.task("javascript",()=>{
            return gulp.src(["./src/javascripts/*.js"])
            .pipe(babel())
            .pipe(gulp.dest("./dist/javascripts"))
      })
      gulp.task("sass",()=>{
           return  gulp.src(["./src/sass/*.scss"])
            .pipe(sass().on("error",sass.logError))
            .pipe(gulp.dest("./dist/css"))
      })
      gulp.task("watch",()=>{
            gulp.watch("./src/pages/*.html",["html"]);
            gulp.watch("./src/sass/*.scss",["sass"]);
      })
      gulp.task("connect",()=>{
            connect.server()
      })

gulp.task("default",["watch","connect"]);