const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs= require("fs");
exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  return books;
};
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};
exports.saveImage= async (file,imageName) =>{
  const oldPath = file.bookImage.path;
  const imageType = file.bookImage.name.split('.').pop();
  const imagePath = `./public/images/booksImage/${imageName}.${imageType}`;
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
}
exports.paging = async (page,pageLimit)=>{
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const totalBook = await  bookCollection.count();
  const books = await bookCollection.find({}).skip(limit*currentPage-limit).limit(limit).toArray();
  return {books,totalBook};
}
