const hbs = require("hbs");
hbs.registerHelper("isAbleToCanceled", value => {
  return value !== "Chờ giao hàng";
});
module.exports;
