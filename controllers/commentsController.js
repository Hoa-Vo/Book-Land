const booksModel = require("../models/booksModel");

exports.receiveComment =async (req,res,next)=>
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
    
    const commentcount=await booksModel.commentCount(commentobj.bookId);
    res.status(200).send({count: commentcount});
  }
  else res.status(204).end();
}

exports.fetchCommentByPage = async (req,res,next)=>
{
  const bookId=req.query.bookId;
  const pageLimit=req.query.pageLimit;
  const page=req.query.page;
  const commentsToShow=await booksModel.fetchCommentsByPage(bookId,pageLimit,page);
  if(commentsToShow!=undefined || commentsToShow!=null){
    const commentcount=await booksModel.commentCount(bookId);
    res.status(200).send({count: commentcount,commentlist: commentsToShow});
  }
  else res.status(204).end();
}

function dateGenerator(offset)
{
  var configOffset=0+offset;
  return new Date( new Date().getTime() +configOffset*3600*1000 ).toUTCString().replace( / GMT$/, "" )
}