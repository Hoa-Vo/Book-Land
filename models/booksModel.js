const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
require("dotenv/config");

exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ is_deleted: false }).toArray();
  return books;
};
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};


exports.listForHomePage=async ()=>
{
  const bookCollection =await db().collection("Books");
  const categoriesCollection = await db().collection("Category");
  const allBook=await bookCollection.find({}).toArray();
  const count =await bookCollection.find({}).count();
  const result=[];
  for(var i=0;i<6;i++)
  {
    var index=  Math.floor(Math.random() * count);
    console.log(index);
    var categoryID=allBook[index].category_id;
    var findCategory=await categoriesCollection.findOne({_id:ObjectID(categoryID)});
    if(findCategory){
    allBook[index].categoryName=findCategory.name;
    result.push(allBook[index]);
    }
    else
    {
      i--;
    }
  }
  return result;
}

exports.searchBook = async bookName => {
  const bookCollection = await db().collection("Books");
  //const books = await bookCollection.find({}).toArray();
  const books = await bookCollection
    .find({ title: { $regex: bookName, $options: "i" }, is_deleted: false })
    .toArray();

  if (books == null) console.log("Không tìm thấy");
  else {
    console.log("Tìm thấy");
  }
  return books;
};

exports.getTotalBooksInDB = async () => {
  const bookCollection = await db().collection("Books");
  const result = await bookCollection.find({ is_deleted: false }).count();
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
    allCategories[i].count = await bookCollection
      .find({ category_id: currentID, is_deleted: false })
      .count();
  }

  return allCategories;
};

// list by categoryID
exports.listByCategory = async categoryId => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ category_id: categoryId, is_deleted: false }).toArray();

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
  let imagelink;
  await cloudinary.uploader.upload(oldPath, (err, result) => {
    if (err) {
      imagelink = null;
    } else {
      imagelink = result.url;
    }
  });
  return imagelink;
};

exports.paging = async (page, pageLimit, category, searchText) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let data;
  if (category !== "") {
    data = await onlyFilterCategory(page, pageLimit, category);
  } else if (searchText !== "") {
    data = await onlySearchBook(page, pageLimit, searchText);
  } else {
    data = await onlyPaging(page, pageLimit);
  }
  return data;
};
exports.getCartInfo = async data => {
  let arrID = [];
  for (let i = 0; i < data.length; i++) {
    arrID.push(ObjectID(data[i].id));
  }
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ _id: { $in: arrID } }).toArray();
  for (let i = 0; i < books.length; i++) {
    const quantity = getQuantityAtIndex(data, books[i]._id);
    books[i].quantity = quantity;
    books[i].totalPrice = quantity * books[i].sellPrice;
  }
  return books;
};
const getQuantityAtIndex = (data, id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id.toString() === id.toString()) {
      return data[i].quantity;
    }
  }
};

exports.getCartInfo = async data => {
  let arrID = [];
  for (let i = 0; i < data.length; i++) {
    arrID.push(ObjectID(data[i].id));
  }
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ _id: { $in: arrID } }).toArray();
  for (let i = 0; i < books.length; i++) {
    const quantity = getQuantityAtIndex(data, books[i]._id);
    books[i].quantity = quantity;
    books[i].totalPrice = quantity * books[i].sellPrice;
  }
  return books;
};

exports.filter = async (filterOp, page, pageLimit, searchText, category_id, publisher) => {
  let data;
  if (searchText === "" && category_id === "" && publisher === "") {
    data = onlyOrder(page, pageLimit, filterOp);
  } else if (searchText !== "") {
    data = await searchAndOrder(page, pageLimit, searchText, filterOp);
  } else if (category_id !== "") {
    data = await categoryAndOrder(page, pageLimit, category_id, filterOp);
  } else {
    data = await orderAndFilterPublisher(page, pageLimit, filterOp, publisher);
  }
  return data;
};
exports.filterDueToPublisher = async (publisher, page, pageLimit) => {
  const data = onlyFilterPublisher(page, pageLimit, publisher);

  return data;
};
exports.getAllPublisher = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  let arr = [];
  for (const book of books) {
    if (!arr.includes(book.publisher)) {
      arr.push(book.publisher);
    }
  }
  return arr;
};
const searchAndOrder = async (page, pageLimit, searchText, orderId) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let books;
  const op = parseInt(orderId);
  if (op === 2) {
    books = await bookCollection
      .find({ title: { $regex: searchText, $options: "i" } })
      .sort({ sellPrice: 1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  if (op === 3) {
    books = await bookCollection
      .find({ title: { $regex: searchText, $options: "i" } })
      .sort({ sellPrice: -1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  const totalBook = books.length;
  return { books, totalBook };
};

const categoryAndOrder = async (page, pageLimit, categoryId, orderId) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let books;
  const op = parseInt(orderId);
  if (op === 2) {
    books = await bookCollection
      .find({ category_id: categoryId, is_deleted: false })
      .sort({ sellPrice: 1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  if (op === 3) {
    books = await bookCollection
      .find({ category_id: categoryId, is_deleted: false })
      .sort({ sellPrice: -1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  const totalBook = books.length;
  return { books, totalBook };
};

const onlyFilterCategory = async (page, pageLimit, category_id) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const books = await bookCollection
    .find({ category_id: category_id, is_deleted: false })
    .skip(limit * currentPage - limit)
    .limit(limit)
    .toArray();
  const totalBook = books.length;
  return { books, totalBook };
};

const onlySearchBook = async (page, pageLimit, searchText) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const books = await bookCollection
    .find({ title: { $regex: searchText, $options: "i" }, is_deleted: false })
    .toArray();
  const totalBook = books.length;
  return { books, totalBook };
};

const onlyPaging = async (page, pageLimit) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const books = await bookCollection
    .find({ is_deleted: false })
    .skip(limit * currentPage - limit)
    .limit(limit)
    .toArray();
  const totalBook = await bookCollection.count();
  return { books, totalBook };
};
const onlyOrder = async (page, pageLimit, orderId) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let books;
  const op = parseInt(orderId);
  if (op === 2) {
    books = await bookCollection
      .find({ is_deleted: false })
      .sort({ sellPrice: 1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  if (op === 3) {
    books = await bookCollection
      .find({ is_deleted: false })
      .sort({ sellPrice: -1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  const totalBook = books.length;
  return { books, totalBook };
};

const onlyFilterPublisher = async (page, pageLimit, publisher) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const books = await bookCollection
    .find({ publisher: publisher, is_deleted: false })
    .sort({ sellPrice: -1 })
    .skip(limit * currentPage - limit)
    .limit(limit)
    .toArray();
  const totalBook = books.length;
  return { books, totalBook };
};

const orderAndFilterPublisher = async (page, pageLimit, orderId, publisher) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let books;
  const op = parseInt(orderId);
  if (op === 2) {
    books = await bookCollection
      .find({ publisher: publisher, is_deleted: false })
      .sort({ sellPrice: 1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  if (op === 3) {
    books = await bookCollection
      .find({ publisher: publisher, is_deleted: false })
      .sort({ sellPrice: -1 })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
  }
  const totalBook = books.length;
  return { books, totalBook };
};
