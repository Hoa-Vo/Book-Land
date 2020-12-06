const booksListModel = require("../models/booksModel");

exports.listing = async (req, res, next) => {
  // Get books from model
  const books = await booksListModel.list();
  // Pass data to view to display list of books
  res.render("booksPage/bookslist", { books });
};
exports.paging= async  (req,res,next)=>{
  const data  = await  booksListModel.paging(req.query.page,req.query.pagelimit);
  res.send({data});
}