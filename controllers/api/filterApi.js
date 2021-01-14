const bookModel = require("../../models/booksModel");

exports.getBookFilter = async (req, res, next) => {
  const data = await bookModel.filter(
    req.query.filterOp,
    req.query.page,
    req.query.pagelimit,
    req.query.searchText,
    req.query.category_id
  );
  res.send({ data });
};
