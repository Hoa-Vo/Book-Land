const booksListModel = require("../models/booksModel");

exports.listing = (req, res, next) => {
  // Get books from model
  const books = booksListModel.list();
  const ID = req.params.id;
  var currentbooks = books[0];

  books.forEach(element => {
    if (element.id == ID) {
      currentbooks = element;
    } else {
      //do nothing
    }
  });
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", { title: currentbooks.title, id: currentbooks.id, basePrice: currentbooks.basePrice, publisher: currentbooks.publisher, author: currentbooks.author });
};
