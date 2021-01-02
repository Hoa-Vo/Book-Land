const locationModel = require("../../models/locationModel");

exports.getCity = async (req, res, next) => {
  const allCityName = await locationModel.getCity();
  res.json({ allCityName });
};
exports.getDistrict = async (req, res, next) => {
  const allDistrict = await locationModel.getDistrict(req.query.city);
  res.json({ allDistrict });
};
