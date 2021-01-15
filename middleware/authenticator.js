exports.credentialUser = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.verifyUser = async (req, res, next) => {
  if (req.user.isVerified) {
    next();
  } else {
    res.redirect("/verify");
  }
};
