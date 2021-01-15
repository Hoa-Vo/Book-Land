const currencyFormatter = require("currency-formatter");
const booksModel = require("../models/booksModel");
const accountModel = require("../models/accountModel");

exports.get = async (req, res, next) => {
  // Get books from model
  const book = await booksModel.get(req.params.id);
  let userToShow = null;
  if (req.user) {
    console.log(`req.user: ${req.user._id}`);
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
    console.log(userToShow);
  }
  book.sellPrice = currencyFormatter.format(book.sellPrice, { locale: "vi-VN" });
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", {
    id: book._id,
    title: book.title,
    basePrice: book.sellPrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
    userToShow: userToShow,
  });
};
