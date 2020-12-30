const express = require("express");
const router = express.Router();

const checkExistUsernameController = require("../controllers/api/checkExistUsernameController");  
const checkExistEmailController =require("../controllers/api/checkExistEmailController");  
const cartApi = require("../controllers/api/cartApi");

router.get("/checkExistedUsername/:username", checkExistUsernameController.checkExistUsername); 

router.get("/get-cart", cartApi.getCartInfo);
router.get("/get-cart/user", cartApi.getUserCartInfo);


module.exports = router;