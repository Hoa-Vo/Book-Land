const booksListModel = require("../models/booksModel");

exports.get = async (req, res, next) => {
  console.log("search bookslist day");

  const bookName = req.query.bookName;
  const totalBooks = await booksListModel.searchBook(bookName);
  const booksToShow = await booksListModel.searchBook(bookName);

  console.log(totalBooks);
  console.log(booksToShow);
  const categoriesListToShowInMenu = await booksListModel.getAllCategory();
  const currentCategory = "Tất cả";
  const receivedCategoryID = req.query.categoryID;
  console.log(req.url);
  console.log(bookName);
  console.log();

  res.render("booksPage/bookslist", {
    bookName,
    totalBooks: totalBooks,
    currentCategoryId: receivedCategoryID,
    books: booksToShow,
    categories: categoriesListToShowInMenu,
    currentCategory: currentCategory,
  });
};
