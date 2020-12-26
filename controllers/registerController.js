const accountModel = require("../models/accountModel");

exports.renderRegisterPage = (req, res, next) => {
  res.render("./login-register/register");
};

exports.registerNewUser = async (req,res,next) => {
   console.log("To register controller");
   await accountModel.addNewUser
   (req.body.username,req.body.password,req.body.email); 
   res.redirect("/login");
};
