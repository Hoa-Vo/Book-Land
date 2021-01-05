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
  res.render("orderPage/orderDetail", { userToShow: userToShow, orderInfo: orderInfo });
};
