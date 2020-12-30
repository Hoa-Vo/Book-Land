const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const searchSpecifiedBookController = require("../controllers/searchSpecifiedBookController");
const commentController = require("../controllers/commentsController");
const pagingApi = require("../controllers/api/pagingApi");
// Get booklist page
router.get("/", booksListController.listing);
router.post("/:id/send-comment", commentController.receiveComment);
router.get("/:id/comment-paging", commentController.fetchCommentByPage);
router.get("/search", searchSpecifiedBookController.get);
router.get("/:id", booksDetailController.get);
router.delete("/", (req, res, next) => {
  console.log(req.query.ID);
});
module.exports = router;
