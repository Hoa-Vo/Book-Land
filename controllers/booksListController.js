const booksListModel = require("../models/booksModel");

exports.listing = async (req, res, next) => {
   // get req category 
   const totalBooks = booksListModel.getTotalBooksInDB(); 
   console.log(totalBooks);
   const receivedCategoryID = req.query.categoryID; 
   let currentCategory = null; 
 
   let booksToShow;
   console.log(`Received with query: ${receivedCategoryID}`); 
 
   if(receivedCategoryID === "all")
   {
     res.redirect('/bookslist/');
     return;
   }
   if(receivedCategoryID != undefined)
   {
     // Apply filter
     
     booksToShow = await booksListModel.listByCategory(receivedCategoryID); 
     currentCategory = await booksListModel.getCategoryNameById(receivedCategoryID); 
     currentCategory = currentCategory.name;
   }
   else{
     currentCategory = "Tất cả";
     booksToShow = await booksListModel.list();
   }
    
    
   
   const categoriesListToShowInMenu = await booksListModel.getAllCategory(); 
   // Pass data to view to display list of books

  res.render("booksPage/bookslist", {totalBooks:totalBooks, currentCategoryId: receivedCategoryID,books: booksToShow, categories: categoriesListToShowInMenu, currentCategory:currentCategory});
};
exports.paging= async  (req,res,next)=>{
  const data  = await  booksListModel.paging(req.query.page,req.query.pagelimit);
  res.send({data});
}