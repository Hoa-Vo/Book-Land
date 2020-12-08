const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
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

exports.getTotalBooksInDB = async () => {
  const bookCollection = await db().collection("Books");
  const result = await bookCollection.find({}).count();
  return result;
};

exports.getCategoryNameById = async id => {
  const categoriesCollection = await db().collection("Category");
  const result = categoriesCollection.findOne({ _id: ObjectID(id) });
  return result;
};

exports.getAllCategory = async () => {
  const categoriesCollection = await db().collection("Category");
  const bookCollection = await db().collection("Books");
  const allCategories = await categoriesCollection.find({}).toArray();
  for (i = 0; i < allCategories.length; i++) {
    let currentID = allCategories[i]._id.toString();
    allCategories[i].count = await bookCollection.find({ category_id: currentID }).count();
  }

  return allCategories;
};

// list by categoryID
exports.listByCategory = async categoryId => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ category_id: categoryId }).toArray();
  return books;
};
exports.saveImage = async (file, imageName) => {
  const oldPath = file.bookImage.path;
  const imageType = file.bookImage.name.split(".").pop();
  const imagePath = `./public/images/booksImage/${imageName}.${imageType}`;
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
};
exports.paging = async (page, pageLimit,category) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let totalBook;
  let books;
  if(category) {
    books = await bookCollection.find({category_id: category}).skip(limit * currentPage - limit).limit(limit).toArray();
    totalBook = books.length;
  }
  // else if(searchText){
  //   books=await bookCollection.find({ title: { $regex:searchText, $options: "i" } }).toArray();
  //   totalBook = books.length;
  // }
  else{
    books = await bookCollection.find({}).skip(limit * currentPage - limit).limit(limit).toArray();
    totalBook = await  bookCollection.count();
  }
  return {books,totalBook};
};
