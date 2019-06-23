import express from "express";
var router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", { title: "Expressss" });
});

export default router;
