"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _station = _interopRequireDefault(require("./routes/station"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

var app = (0, _express["default"])();

_nunjucks["default"].configure(_path["default"].join(__dirname, "../views"), {
  autoescape: true,
  express: app,
  noCache: true
});

app.set("view engine", "html");
app.use("/", _index["default"]);
app.use("/station", _station["default"]); // uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((0, _morgan["default"])("dev"));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public"))); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
app.listen(4000, function () {
  return console.log("port is");
});