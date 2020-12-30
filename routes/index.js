const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const cartApi = require("../controllers/api/cartApi");
const { authenticate } = require("passport");
/* GET home page. */
router.get("/", homePageController.renderHomePage);

module.exports = router;
