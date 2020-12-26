exports.renderHomePage = (req, res, next) => {
  let isSignedIn = false; 
  if(req.user)
  {
    console.log(`req.user: ${req.user._id}`); 
    isSignedIn =  true; 
  }

  
  // render based on logged in or not
  res.render("./homepage/index");
};
