exports.renderForgotPasswordPage = (req,res,next) => 
{
    let userToShow = null;
    console.log("Inside controller");
    res.render("./forgotPassword/forgotPassword", {userToShow: userToShow}); 
}


exports.renderEnterNewPasswordPage = (req,res,next) => 
{
    res.render("./forgotPassword/enterNewPassword");
}