const express = require("express");
const router = express.Router();
const cartApi = require("../../controllers/api/cartApi");

router.get("/get-cart", cartApi.getCartInfo);
router.get("/get-cart/user", cartApi.getUserCartInfo);
router.get("/add-book-to-cart/user", cartApi.addBookToCart);
router.get("/del-book-from-cart/user", cartApi.delBookFromCart);
router.get("/update-book-from-cart/user", cartApi.updateBookFromCart);
module.exports = router;
