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
    await cartCollection.update(
      { userId: userId, "books.id": bookId },
      { $inc: { "books.$.quantity": 1 } }
    );
  } else {
    await cartCollection.update(
      { userId: userId },
      { $push: { books: { id: bookId, quantity: 1 } } }
    );
  }
  const userCartAfterUpdate = await cartCollection.findOne({ userId: userId });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.delBookFromUserCart = async (userId, bookId) => {
  const cartCollection = await db().collection("UserCart");

  await cartCollection.update({ userId: userId }, { $pull: { books: { id: bookId } } });

  const userCartAfterUpdate = await cartCollection.findOne({ userId: userId });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.updateBookFromUserCart = async (userId, bookId, quantity) => {
  if (quantity === "0") {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update({ userId: userId }, { $pull: { books: { id: bookId } } });
    const userCartAfterUpdate = await cartCollection.findOne({ userId: userId });
    const books = userCartAfterUpdate.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  } else {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update(
      { userId: userId, "books.id": bookId },
      { $set: { "books.$.quantity": parseInt(quantity) } }
    );
    const userCartAfterUpdate = await cartCollection.findOne({ userId: userId });
    const books = userCartAfterUpdate.books;
    console.log(books);
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  }
};
