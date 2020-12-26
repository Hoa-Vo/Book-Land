const bookModel = require("../../models/booksModel");

exports.getCartInfo = async (req, res, next) => {
  if (req.query.cart === ""||req.query.cart===undefined) {
    res.send("empty");
  }
  else{
   const books=await bookModel.getCartInfo(req.query.cart);
   res.json(books);
  }
};
