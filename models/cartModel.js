const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bookModel = require("./booksModel");

exports.getUserCart = async id => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: id });
  const books = userCart.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};

exports.addBookToUserCart = async (userId, bookId) => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: userId });
  const isExistInCart = userCart.books.find(element => element.id === bookId);
  if (isExistInCart) {
    const result = userCart.updateOne({ userId: userId }, $set);
  }
};
