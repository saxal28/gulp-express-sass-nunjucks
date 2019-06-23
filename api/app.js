import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import index from "./routes/index";
import station from "./routes/station";
import favicon from "serve-favicon";

var app = express();

nunjucks.configure(path.join(__dirname, "../views"), {
  autoescape: true,
  express: app,
  noCache: true
});

app.set("view engine", "html");

app.use("/", index);
app.use("/station", station);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(4000, () => console.log("port is"));
