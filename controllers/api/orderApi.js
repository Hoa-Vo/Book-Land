const orderModel = require("../../models/oderModel");

exports.addOrder = async (req, res, next) => {
  await orderModel.addOrder(
    req.query.name,
    req.query.userID,
    req.query.city,
    req.query.district,
    req.query.subDistrict,
    req.query.address
  );
};
