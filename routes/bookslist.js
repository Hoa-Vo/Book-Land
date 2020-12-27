const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const searchSpecifiedBookController = require("../controllers/searchSpecifiedBookController");
const pagingApi = require("../controllers/api/pagingApi");
// Get booklist page
router.get("/", booksListController.listing);
router.get("/search", searchSpecifiedBookController.get);
router.get("/api/paging", pagingApi.paging);
router.get("/:id", booksDetailController.listing);
router.delete("/", (req, res, next) => {
  console.log(req.query.ID);
});
module.exports = router;
