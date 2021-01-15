const orderModel = require("../../models/orderModel");

exports.addOrder = async (req, res, next) => {
  await orderModel.addOrder(
    req.body.name,
    req.body.userID,
    req.body.city,
    req.body.district,
    req.body.subDistrict,
    req.body.address,
    req.body.shippingCost,
    req.body.totalMoney
  );
};

exports.getAllOrder = async (req, res, next) => {
  const data = await orderModel.getAllOrder(req.query.userID);
  res.json(data);
};

exports.cancelOrder = async (req, res, next) => {
  const result = await orderModel.cancelOrder(req.body.orderId);
  res.send(result);
};

exports.getTransportingOrder = async (req, res, next) => {
  const data = await orderModel.getTransportingOrder(req.query.userID);
  res.json(data);
};

exports.getTransportedOrder = async (req, res, next) => {
  const data = await orderModel.getTransportedOrder(req.query.userID);
  res.json(data);
};

exports.getCanceledOrder = async (req, res, next) => {
  const data = await orderModel.getCanceledOrder(req.query.userID);
  res.json(data);
};
