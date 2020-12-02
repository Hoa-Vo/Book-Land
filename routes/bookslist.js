const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
// Get booklist page
router.get("/", booksListController.listing);
router.get("/:id", booksDetailController.listing);
router.delete("/", (req, res, next) => {
  console.log(req.query.ID);
});
module.exports = router;
