const bookModel = require("../models/booksModel");
const categoryModel = require("../models/categoryModel");
 



exports.getRecommendWithSameCategory = async (categoryId, amount) => 
{
    const checkExists = await categoryModel.checkExistsCategoryID(categoryId); 
    if(!checkExists)
    {
        return null;
    }
    else
    {
        const booklist = await bookModel.listByCategoryWithLimit(categoryId,amount);
        return booklist;
    }
}

exports.getRecommendOnBuyingRecord = async(bookId, amount) => 
{
   
}