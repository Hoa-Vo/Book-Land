const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
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

exports.searchBook = async bookName => {
  const bookCollection = await db().collection("Books");
  //const books = await bookCollection.find({}).toArray();
  const books = await bookCollection.find({ title: { $regex: bookName, $options: "i" } }).toArray();
  console.log(books);
  if (books == null) console.log("Không tìm thấy");
  else {
    console.log("Tìm thấy");
    console.log();
  }
  return books;
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
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
};

exports.editAvatar = async userObject => {
  const userCollection = await db().collection("registeredUser");
  const id = userObject.id;
  let success = false;

  let existsUser = await userCollection.findOne({ _id: ObjectID(id) });
  if (existsUser === null || existsUser === undefined) {
    console.log(`Cant find user with id ${id}`);
    success = false;
  } else {
    userCollection.updateOne(
      { _id: ObjectID(id) },
      {
        $set: {
          avatar_image: userObject.avatar_image,
        },
      }
    );
    success = true;
  }
  return success;
};

exports.saveAvatar = async file => {
  const oldPath = file.avatarImageInput.path;
  const imageName = file.avatarImageInput.path.split(path.sep).pop();

  const imageType = file.avatarImageInput.name.split(".").pop();

  const imagePath = path.join(".", "public", "images", "userImage", `${imageName}.${imageType}`);

  let rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);

  return `${imageName}.${imageType}`;
};

exports.paging = async (page, pageLimit, category, searchText) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let totalBook;
  let books;
  if (category) {
    books = await bookCollection
      .find({ category_id: category })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
    totalBook = books.length;
  } else if (searchText) {
    books = await bookCollection.find({ title: { $regex: searchText, $options: "i" } }).toArray();
    totalBook = books.length;
  } else {
    books = await bookCollection
      .find({})
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
    totalBook = await bookCollection.count();
  }
  return { books, totalBook };
};
