const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("homepage/index");
});

module.exports = router;
