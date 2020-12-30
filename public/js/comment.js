
let currentPage=1;
let maxPage=0;
let totalItems=0;
const maxItemsPerPage=6;

window.onload=function(){
    let currentPage=1;
    let maxPage=0;
    let totalItems=0;
    const maxItemsPerPage=6;
    $(document).ready(function()  {
        load_comment_paging();
        $("#alert-success").hide();
        $("#alert-danger").hide();
    });
}

async function insert_comment(){
    $( "#comment-form" ).click(function( event ) {
        event.preventDefault();
    });

    var check=validateInput();

    if(check==true){
        const yourname=document.getElementById("YourName").value;
        const youremail=document.getElementById('YourEmail').value;
        const yourthoughts =document.getElementById("YourThoughts").value;
        const bookID=document.getElementById("bookId").textContent;
        const url='/bookslist/'+bookID+'/send-comment';
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
            success: function(response)
            {
                if(true)
                {
                    totalItems=response.count;
                    currentPage=1;
                    refreshCommentPost();
                    load_comment_paging();
                    $("#alert-success").text("Thêm bình luận thành công");
                    $("#alert-danger").hide();
                    $("#alert-success").show();
                }
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

async function load_comment_paging()
{
    const bookId= document.getElementById("bookId").textContent;
    const url="/bookslist/"+bookId+"/comment-paging";
    await $.ajax({
        url: url,
        method: "GET",
        data:{
            bookId:bookId,
            pageLimit:maxItemsPerPage,
            page:currentPage,
        },
        success: function(response)
        {
            if (true){
                totalItems=response.count;
                setPageNumber();
                updateCommentsList(response.commentlist,response.count);
                
            }
            return false;
        },
        error:function()
        {
            alert("Lỗi tải comment");
        }
    })
}



function validateInput()
{
    var yourname=document.getElementById("YourName").value;
    var youremail=document.getElementById('YourEmail').value;
    var yourthoughts =document.getElementById("YourThoughts").value;
    
    var result=true;
    $("#alert-success").hide();
    if(yourthoughts=="" || yourthoughts==null||yourthoughts==undefined){
        $("#alert-danger").show();
        $("#alert-danger").text("Thiếu nội dung bình luận");
        result=false;
    }
    else if(yourname=="" || yourname==null||yourname==undefined){
        $("#alert-danger").text("Bạn chưa nhập tên");
        $("#alert-danger").show();
        result=false;
    }
    else if(youremail=="" || youremail==null||youremail==undefined){
        $("#alert-danger").text("Bạn chưa nhập email");
        $("#alert-danger").show();
        result=false;
    }
    else if(validateEmail(youremail)==false){
        $("#alert-danger").text("Email không đúng cấu trúc");
        $("#alert-danger").show();
        result=false;
    }
    return result;
}

function validateEmail(email)
{
    var result=true;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(mailformat)){
       result=true; 
    }
    else{
        result=false;
    }
    return result;
}

function setPageNumber()
{
    maxPage = Math.ceil(totalItems / maxItemsPerPage);
    if(maxPage!=0)
    {
        let page=[];
        const firstPage = (maxPage<=5 )? 1: ((currentPage+5-1>maxPage)?maxPage-5+1:currentPage );
        const lastPage=(maxPage<=5)? maxPage: ((currentPage+5-1>maxPage)?maxPage:currentPage+5-1);
        for(var i=firstPage;i<=lastPage;i++)
        {
            const temp = { curPage: `${i}` };
            page.push(temp);
        }
        const source = $("#paging-list").html();
        const template = Handlebars.compile(source);
        $("#comment-paging").html(template(page));
        const id = `page-${currentPage}`;
        document.getElementById(id).classList.add("active");
    }
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

function prevBtnClick()
{
    if(currentPage>1){
        currentPage--;
        setPageNumber();
        load_comment_paging();
    }
}

function nextBtnClick()
{
    if(currentPage<maxPage){
        currentPage++
        setPageNumber()
        load_comment_paging();
    }
}
function setPage(num) {
    currentPage = parseInt(num);
    setPageNumber();
    load_comment_paging();
}