const accountModel = require("../models/accountModel");
exports.renderHomePage = async (req, res, next) => {
  let isSignedIn = false; 
  let userToShow = null ;
  if(req.user)
  {
    console.log(`req.user: ${req.user._id}`); 
    isSignedIn =  true; 
    userToShow = await accountModel.getUserById(req.user._id); 
    console.log(userToShow); 
  }

  
  // render based on logged in or not
  res.render("./homepage/index",{
    isSignedIn: isSignedIn,
    userToShow: userToShow
  });
};
