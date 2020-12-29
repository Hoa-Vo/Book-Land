const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const cartApi = require("../controllers/api/cartApi");
const { authenticate } = require("passport");
/* GET home page. */
router.get("/", homePageController.renderHomePage);
router.get("/api/get-cart", cartApi.getCartInfo);
router.get("/api/get-cart/user", cartApi.getUserCartInfo);
router.get("/api/add-book-to-cart/user", cartApi.addBookToCart);
router.get("/api/del-book-from-cart/user", cartApi.delBookFromCart);
router.get("/api/update-book-from-cart/user", cartApi.updateBookFromCart);
module.exports = router;
