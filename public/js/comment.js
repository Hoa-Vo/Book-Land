let list=[];

window.onload=function(){
    $(document).ready(function()  {
        loadAllComments();
    });
}

async function doPost(){
    const yourname=document.getElementById("YourName").value;
    const youremail=document.getElementById('YourEmail').value;
    const yourthoughts =document.getElementById("YourThoughts").value;
    const bookID=document.getElementById("bookId").textContent;
    const url='/bookslist/'+bookID+'/comment';
    $( "#comment-form" ).click(function( event ) {
        event.preventDefault();
        });
    if(yourname=="" ||youremail==""|| yourthoughts=="")
    {
        //alert  missing information
        validateInput();
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
                refreshCommentPost();
                return false;
            },
            error: function(error)
            {
                alert("Lỗi khi thêm đánh giá");
                return false;
            }   
        });
    }

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
            
            updateCommentsList(response.commentlist,response.count);
        },
        error:function()
        {
            alert("Lỗi tải comment");
        }
    })
}

function validateInput()
{

}

function updateCommentsList(list,count) {
    const source = $("#commentsList").html();
    const template = Handlebars.compile(source);
    $("#comments-list").html(template(list));
    document.getElementById("comment-count-3").textContent=count;
    document.getElementById("comment-count-2").textContent=count;
    document.getElementById("comment-count-1").textContent=count;
}
function refreshCommentPost()
{
    document.getElementById("YourName").value="";
    document.getElementById('YourEmail').value="";
    document.getElementById("YourThoughts").value="";
}

