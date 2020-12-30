const commentModel = require("../models/commentModel");
const booksModel =require("../models/booksModel");
exports.receiveComment =async (req,res,next)=>
{
  const book = await booksModel.get(req.body.bookId);
  let commentobj={
    body: req.body,
    createdDate: dateGenerator(7),
  }
  let check= commentModel.insertComment(commentobj);
  if(book!=undefined || check ==false)
  {
    const commentcount=await commentModel.commentCount(commentobj.body.bookId);
    res.status(200).send({count: commentcount});
  }
  else res.status(204).end();
  
}

exports.fetchCommentByPage = async (req,res,next)=>
{
  const bookId=req.query.bookId;
  const pageLimit=req.query.pageLimit;
  const page=req.query.page;
  const commentsToShow=await commentModel.fetchCommentsByPage(bookId,pageLimit,page);
  if(commentsToShow!=undefined || commentsToShow!=null){
    const commentcount=await commentModel.commentCount(bookId);
    res.status(200).send({count: commentcount,commentlist: commentsToShow});
  }
  else res.status(204).end();
}

function dateGenerator(offset)
{
  var configOffset=0+offset;
  return new Date( new Date().getTime() +configOffset*3600*1000 ).toUTCString().replace( / GMT$/, "" )
}
