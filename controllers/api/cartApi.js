const bookModel = require("../../models/booksModel");
const cartModel = require("../../models/cartModel");

exports.getCartInfo = async (req, res, next) => {
  if (req.query.cart === "" || req.query.cart === undefined) {
    res.send("empty");
  } else {
    const books = await bookModel.getCartInfo(req.query.cart);
    res.json(books);
  }
};
exports.getUserCartInfo = async (req, res, next) => {
  const cartInfo = await cartModel.getUserCart(req.query.userID);
  res.json(cartInfo);
};
exports.addBookToCart = async (req, res, next) => {
  const cartInfo = await cartModel.addBookToUserCart(req.query.userID, req.query.bookID);
};
