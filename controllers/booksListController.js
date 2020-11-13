const booksListModel = require('../models/booksModel'); 


exports.listing = (req, res, next) => {
    // Get books from model
    const books = booksListModel.list();

    // Pass data to view to display list of books
    res.render('bookslist', {books});
};