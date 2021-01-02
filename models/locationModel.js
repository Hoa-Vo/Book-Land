const { db } = require("../database/db");

exports.getCity = async () => {
  const cityCollection = await db().collection("Location");
  const allCity = await cityCollection.find({}).toArray();
  let data = [];
  for (let i = 0; i < allCity.length; i++) {
    data.push({ name: allCity[i].city.name });
  }
  return data;
};
exports.getDistrict = async cityName => {
  const cityCollection = await db().collection("Location");
  const city = await cityCollection.findOne({ "city.name": cityName });
  console.log(city);
  return city.city.district;
};
