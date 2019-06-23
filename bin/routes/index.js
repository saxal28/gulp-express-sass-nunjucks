"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// var express = require("express");
var router = _express["default"].Router();
/* GET home page. */


router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Expressss"
  });
});
module.exports = router;