const categoryModel = require("../models/categoryModel");


exports.addNewCategory = async (categoryName) => 
{
    let exists = await categoryModel.checkExistCategoryName(categoryName); 

    if(!exists)
    {
        let newId  = await categoryModel.addNewCategory(categoryName); 
        return true; 
    }
    else{
        return false;
    }
}