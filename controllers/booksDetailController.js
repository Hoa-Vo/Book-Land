const currencyFormatter = require("currency-formatter");
const booksModel = require("../models/booksModel");
const accountModel = require("../models/accountModel");
const bookSevices = require("../services/booksService"); 

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

  let categoryRecommendation = await bookSevices.getRecommendWithSameCategory(book.category_id, 5);
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", {
    id: book._id,
    title: book.title,
    basePrice: book.sellPrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
    userToShow: userToShow,
    categoryRecommendation: categoryRecommendation
  });
};
