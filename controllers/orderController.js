const currencyFormatter = require("currency-formatter");
const accountModel = require("../models/accountModel");
const orderModel = require("../models/orderModel");

exports.renderOrderPage = async (req, res, next) => {
  let userToShow = null;
  if (req.user) {
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
  }
  res.render("orderPage/order", { userToShow: userToShow });
};

exports.renderOrderDetailPage = async (req, res, next) => {
  let userToShow = null;
  if (req.user) {
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
  }
  const orderId = req.params.id.toLowerCase();
  const orderInfo = await orderModel.getOrderById(orderId);
  const date = orderInfo.createDate;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  for (const book of orderInfo.books) {
    book.basePrice = currencyFormatter.format(book.basePrice, { locale: "vi-VN" });
  }
  const totalPrice = currencyFormatter.format(orderInfo.totalMoney, { locale: "vi-VN" });
  orderInfo.createDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  orderInfo.orderId = req.params.id;
  res.render("orderPage/orderDetail", {
    userToShow: userToShow,
    orderInfo: orderInfo,
    totalPrice: totalPrice,
  });
};
