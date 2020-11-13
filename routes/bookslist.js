const express = require('express'); 
const router = express.Router();
const booksListController = require('../controllers/booksListController');

// Get booklist page
router.get('/', booksListController.listing);


module.exports  =router;


