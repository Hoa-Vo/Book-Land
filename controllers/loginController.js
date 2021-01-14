const passport = require("../middleware/passport/index"); 
const flash = require('connect-flash');

exports.renderLoginPage = (req, res, next) => {

  let errorMessage = req.flash('error')[0];

  console.log(errorMessage);
  res.render("./login-register/login", {error: errorMessage});

};

exports.tryLogin = (req,res,next) => {
  passport.authenticate('local', {successRedirect: "/",failureRedirect: "/login",failureFlash: true});
}
