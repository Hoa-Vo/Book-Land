const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
exports.listing = async (req, res, next) => {
  // Get books from model
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(req.params.id) });
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", {
    title: book.title,
    basePrice: book.basePrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
  });
};
