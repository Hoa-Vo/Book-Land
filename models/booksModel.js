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

exports.getCategoryNameById = async id => 
{
  const categoriesCollection = await db().collection("Category");
  const result = categoriesCollection.findOne({_id: ObjectID(id)});
  return result; 
}

exports.getAllCategory  = async() => 
{
  const categoriesCollection = await db().collection("Category");
  const allCategories = await categoriesCollection.find({}).toArray(); 
  return allCategories; 
}


// list by categoryID 
exports.listByCategory = async categoryId => 
{
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({category_id: categoryId}).toArray(); 
 
  return books; 
}
exports.saveImage= async (file,imageName) =>{
  const oldPath = file.bookImage.path;
  const imageType = file.bookImage.name.split('.').pop();
  const imagePath = `./public/images/booksImage/${imageName}.${imageType}`;
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
}