const accountServices = require("../../services/accountServices");
exports.verifyUser = async (req, res, next) => {
  accountServices.sendVerifyEmail(req.user._id);
};
