var gulp = require("gulp");
var browser = require("browser-sync");

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("**/**", function() {
    browser.reload();   // ファイルに変更があれば同期しているブラウザをリロード
  });

});

gulp.task("default",['server']);
