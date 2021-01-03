const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const accountModel = require("./accountModel");
const cartModel = require("../models/cartModel");

exports.getOrder = async userId => {};

exports.addOrder = async (name, userID, city, district, subDistrict, address) => {
  const booksInUserCart = await cartModel.getUserBookArr(userID);
  const orderCollection = await db().collection("UserOrder");
  await orderCollection.insertOne({
    userID: ObjectID(userID),
    city: city,
    district: district,
    subDistrict: subDistrict,
    address: address,
    name: name,
    books: booksInUserCart,
  });
};
