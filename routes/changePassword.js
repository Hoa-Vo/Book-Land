
const express = require("express");
const router = express.Router();

const changepasswordController = require("../controllers/changePasswordController");


router.get("/", changepasswordController.renderChangePasswordPage); 


module.exports = router;