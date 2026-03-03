const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Scénariothèque API is alive" });
});

module.exports = router;
