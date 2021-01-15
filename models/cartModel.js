const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bookModel = require("./booksModel");

exports.getUserCart = async id => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: ObjectID(id) });
  if (userCart) {
    const books = userCart.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  } else {
    await cartCollection.insertOne({
      userId: ObjectID(id),
      books: [],
    });
    return [];
  }
};

exports.addBookToUserCart = async (userId, bookId, quantity) => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: ObjectID(userId) });
  const isExistInCart = userCart.books.find(element => element.id.toString() === bookId);
  if (isExistInCart) {
    if (quantity === "NaN") {
      await cartCollection.update(
        { userId: ObjectID(userId), "books.id": ObjectID(bookId) },
        { $inc: { "books.$.quantity": 1 } }
      );
    } else {
      await cartCollection.update(
        { userId: ObjectID(userId), "books.id": ObjectID(bookId) },
        { $inc: { "books.$.quantity": parseInt(quantity) } }
      );
    }
  } else {
    if (quantity === "NaN") {
      await cartCollection.update(
        { userId: ObjectID(userId) },
        { $push: { books: { id: ObjectID(bookId), quantity: 1 } } }
      );
    } else {
      await cartCollection.update(
        { userId: ObjectID(userId) },
        { $push: { books: { id: ObjectID(bookId), quantity: parseInt(quantity) } } }
      );
    }
  }
  const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.delBookFromUserCart = async (userId, bookId) => {
  const cartCollection = await db().collection("UserCart");
  await cartCollection.update(
    { userId: ObjectID(userId) },
    { $pull: { books: { id: ObjectID(bookId) } } }
  );
  const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.updateBookFromUserCart = async (userId, bookId, quantity) => {
  if (quantity === "0") {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update(
      { userId: ObjectID(userId) },
      { $pull: { books: { id: ObjectID(bookId) } } }
    );
    const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
    const books = userCartAfterUpdate.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  } else {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update(
      { userId: ObjectID(userId), "books.id": ObjectID(bookId) },
      { $set: { "books.$.quantity": parseInt(quantity) } }
    );
    const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
    const books = userCartAfterUpdate.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  }
};

exports.getUserBookArr = async id => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: ObjectID(id) });
  return userCart.books;
};

exports.deleteUserCart = async id => {
  const cartCollection = await db().collection("UserCart");
  await cartCollection.remove({ userId: ObjectID(id) });
};
