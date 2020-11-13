const express = require('express');
const register = express.Router();

/* GET register page. */
register.get('/', function(req, res) {
  res.render('register');
});


module.exports = register;