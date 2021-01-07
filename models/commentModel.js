const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const { compareSync } = require("bcrypt");

exports.insertComment = async commentObj => {
  const commentCollection = await db().collection("CommentsBook");
  let success = true;
  let body = commentObj.body;
  let isSingedIn = body.isSingedIn;
  let isExistBook = await commentCollection.find({ bookId: body.bookId }).count();

  if (isExistBook != 0) {
    commentCollection.updateOne(
      { bookId: body.bookId },
      {
        $push: {
          comment: {
            userId: body.userId,
            name: body.userName,
            email: body.userEmail,
            content: body.content,
            createdDate: commentObj.createdDate,
          },
        },
      }
    );
  } else if (isExistBook == 0) {
    commentCollection.insertOne({
      bookId: body.bookId,
      comment: [
        {
          userId: body.userId,
          name: body.userName,
          email: body.userEmail,
          content: body.content,
          createdDate: commentObj.createdDate,
        },
      ],
    });
  }
  return success;
};

exports.fetchAllComments = async bookId => {
  const commentCollection = await db().collection("CommentsBook");
  let commentsList = commentCollection.find({ bookId: bookId }).sort({ _id: -1 }).toArray();

  return commentsList;
};

exports.commentCount = async bookId => {
  let commentBook = await db().collection("CommentsBook").findOne({ bookId: bookId });
  let commentList = null;
  let count=0;
  if(commentBook!=null && commentBook!=undefined && commentBook!="")
  {
    commentList=commentBook.comment;
    count=commentList.length;
  }
  return count;
};

exports.fetchCommentsByPage = async (bookId, pageLimit, page) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  let commentList=null;
  let result=[];
  let commentBook = await db().collection("CommentsBook").findOne({ bookId: bookId });
  
  if(commentBook!=null && commentBook!=undefined && commentBook!="")
  {
    commentList=commentBook.comment;
    let length = commentList.length;
    let start = length - limit * (currentPage - 1) - 1;
    let end = start - limit + 1 < 0 ? 0 : start - limit + 1;

    for (i = start; i >= end; i--) {
      result.push(commentList[i]);
    }
  }
  return result;
};
