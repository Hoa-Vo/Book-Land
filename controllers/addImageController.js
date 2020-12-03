const formidable=require("formidable");
const bookModel= require("../models/booksModel");


exports.addImage = async (req,res,next)=>{
    const form = formidable.IncomingForm();
    await form.parse(req, function (err, fields, files) {
        if(err){
            res.send(204);
        }
        else {
            console.log(files);
            bookModel.saveImage(files,fields.imageName);
            res.send(202);
        }
    })
}