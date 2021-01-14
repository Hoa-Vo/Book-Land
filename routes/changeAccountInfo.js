const express = require("express");
const router = express.Router();

const changeAccountInformationController = require("../controllers/changeAccountInfoController"); 

router.get("/", changeAccountInformationController.renderChangeAccountInfoPage); 


module.exports = router;