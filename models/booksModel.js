const { db } = require("../database/db");
exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  return books;
};
