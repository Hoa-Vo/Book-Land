const express = require("express");
const login = express.Router();

/* GET login page. */
login.get("/", function (req, res) {
  res.render("login-register/login");
});

module.exports = login;
