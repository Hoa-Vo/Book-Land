const booksListModel = require("../models/booksModel");

exports.listing = async (req, res, next) => {
  // Get books from model
  const books = await booksListModel.list();
  // Pass data to view to display list of books
  console.log(books);
  res.render("booksPage/bookslist", { books });
};
