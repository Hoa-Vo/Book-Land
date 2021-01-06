const orderModel = require("../../models/orderModel");

exports.addOrder = async (req, res, next) => {
  await orderModel.addOrder(
    req.body.name,
    req.body.userID,
    req.body.city,
    req.body.district,
    req.body.subDistrict,
    req.body.address
  );
};

exports.getAllOrder = async (req, res, next) => {
  const data = await orderModel.getAllOrder(req.query.userID);
  res.json(data);
};
