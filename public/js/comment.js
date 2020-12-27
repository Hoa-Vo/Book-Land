const { load } = require("dotenv/types");

$(document).ready(async () => {
    
  });

function doPost(){
    const yourname=document.getElementById("YourName").value;
    const youremail=document.getElementById('YourEmail').value;
    const yourthoughts =document.getElementById("YourThoughts").value;
    const bookID=document.getElementById("bookId").textContent;
    const url='/bookslist/'+bookID+'/comment';
        $.ajax({
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
                let list =reponse;
                updateCommentsList(list);
            },
            error: function(error)
            {
                alert("Lỗi khi thêm đánh giá");
            }});
    if(yourname=="" ||youremail==""|| yourthoughts=="")
    {
        //alert  missing information
    }
    else{
        const url='/bookslist/'+bookID+'/comment';
        $.ajax({
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
                let list =reponse;
                updateCommentsList(list);
            },
            error: function(error)
            {
                alert("Lỗi khi thêm đánh giá");
            }   
        });
    }
}

function updateCommentsList(list) {
    const source = $("#commentsList").html();
    const template = Handlebars.compile(source);
    $("#comments-list").html(template(list));
  }

async function loadAllComment()
{
    const bookId= document.getElementById("bookId").textContent;
    const url="/bookslist/"+bookId+"/allcomments";
    $.ajax({
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
loadAllComment();