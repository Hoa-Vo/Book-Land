const booksModel = require("../models/booksModel");

exports.ReceivedComments =async (req,res,next)=>
{
  const book = await booksModel.get(req.body.bookId);
  let commentobj={
    bookId: req.body.bookId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    createdDate: dateGenerator(7),
  }
  let check= booksModel.insertComment(commentobj);
  if(book!=undefined || check ==false)
  {
    const commentsToShow= await booksModel.fetchAllComments(commentobj.bookId);
    
    res.status(202).send(commentsToShow);
  }
  else res.send(204).end();
}

exports.getAllComments = async (req,res,next)=>
{
  const bookId=req.query.bookId;
  const commentsToShow=await booksModel.fetchAllComments(bookId);

    res.status(202).send(commentsToShow);
}

function dateGenerator(offset)
{
  var configOffset=0+offset;
  return new Date( new Date().getTime() +configOffset*3600*1000 ).toUTCString().replace( / GMT$/, "" )
}