const { load } = require("dotenv/types");

$(document).ready(function()  {
    loadAllComments();
  });

  async function doPost(){
    const yourname=document.getElementById("YourName").value;
    const youremail=document.getElementById('YourEmail').value;
    const yourthoughts =document.getElementById("YourThoughts").value;
    const bookID=document.getElementById("bookId").textContent;
    const url='/bookslist/'+bookID+'/comment';
        
    if(yourname=="" ||youremail==""|| yourthoughts=="")
    {
        //alert  missing information
    }
    else{
        const url='/bookslist/'+bookID+'/comment';
        await $.ajax({
            url: url,
            method: 'POST',
            data:
            {
                bookId: bookID,
                name: yourname,
                email:youremail,
                content: yourthoughts,
            },
            success: function(reponse)
            {
                loadAllComments();
            },
            error: function(error)
            {
                alert("Lỗi khi thêm đánh giá");
            }   
        });
    }
    return false;
}

function updateCommentsList(list) {
    const source = $("#commentsList").html();
    const template = Handlebars.compile(source);
    $("#comments-list").html(template(list));
  }

async function loadAllComments()
{
    const bookId= document.getElementById("bookId").textContent;
    const url="/bookslist/"+bookId+"/allcomments";
    await $.ajax({
        url: url,
        method: "GET",
        data:{
            bookId:bookId,
        },
        success: function(response)
        {
            updateCommentsList(response);
        },
        error:function()
        {
            alert("Lỗi tải comment");
        }
    })
}

