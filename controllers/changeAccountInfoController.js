
const accountService = require("../services/accountServices"); 
const accountModel = require("../models/accountModel");


exports.renderChangeAccountInfoPage = async (req,res,next) => 
{
    if(req.user)
    {
        const userToShow = await accountModel.getUserById(req.user._id);
        res.render("userAccount/changeInformation", {userToShow: userToShow}); 
    }
    else{
        res.redirect("/login");
    }
}