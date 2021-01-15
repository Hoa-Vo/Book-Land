const bookModel = require("../../models/booksModel");

exports.getBookFilter = async (req, res, next) => {
  const data = await bookModel.filter(
    req.query.filterOp,
    req.query.page,
    req.query.pagelimit,
    req.query.searchText,
    req.query.category_id,
    req.query.publisher
  );
  res.send({ data });
};

exports.getBookFilterDuetoPublisher = async (req, res, next) => {
  const data = await bookModel.filterDueToPublisher(
    req.query.publisher,
    req.query.page,
    req.query.pagelimit
  );
  res.send({ data });
};
