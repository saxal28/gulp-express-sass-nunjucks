import express from "express";
var router = express.Router();

router.get("/:id", async (req, res, next) => {
  res.render("station", { id: req.params.id });
});

export default router;
