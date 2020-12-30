const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const cartApi = require("../controllers/api/cartApi");
/* GET home page. */
router.get("/", homePageController.renderHomePage);

module.exports = router;
