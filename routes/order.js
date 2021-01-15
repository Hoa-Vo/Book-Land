const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticator = require("../middleware/authenticator");

router.get(
  "/",
  authenticator.credentialUser,
  authenticator.verifyUser,
  orderController.renderOrderPage
);
router.get(
  "/:id",
  authenticator.credentialUser,
  authenticator.verifyUser,
  orderController.renderOrderDetailPage
);

module.exports = router;
