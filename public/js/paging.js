let booksPerPage = 6;
let totalBook;
let maxPage;
let currentPage = 1;
$(document).ready(async () => {
  await fetchData(currentPage,booksPerPage);
});
function prevBtnClick() {
  if (currentPage > 1) {
    currentPage--;
    fetchData(currentPage, booksPerPage);
  }
}
function  nextBtnClick(){
  if (currentPage < maxPage) {
    currentPage++;
    fetchData(currentPage,booksPerPage);
  }
}
function inThisPage(currentPage){
  const id = `page-${currentPage}`;
  console.log(id);
  document.getElementById(id).classList.add("active");
}
function setPage(num){
  fetchData(parseInt(num),6);
}
async function fetchData (currentPage,booksPerPage){
  $.ajax({
    url: "http://localhost:3000/bookslist/page",
    type: "GET",
    data: {
      page: currentPage,
      pagelimit: booksPerPage,
    },
    success: function (res) {
      let content = "";
      let image;
      totalBook = res.data.totalBook;
      maxPage = parseInt(totalBook/booksPerPage);
      res.data.books.forEach(book => {
        image = `<img src='images/booksImage/${book.image_link}'class='img-fluid book-image' alt='Image'>`;
        content +=
            "<div class='col-sm-6 col-md-6 col-lg-4 col-xl-4'>" +
            "<div class='products-single fix'><div class='box-img-hover'>" +
            image +
            "<div class='mask-icon'><ul><li>" +
            "<a href=`/bookslist/' data-toggle='tooltip' data-placement='right' title='Xem'>" +
            "<i class='fas fa-eye'></i></a></li><li><a href='#' data-toggle='tooltip' data-placement='right' title='So sánh'>" +
            "<i class='fas fa-sync-alt'></i></a></li><li><a href='#' data-toggle='tooltip' data-placement='right' title='Thêm vào yêu thích'>" +
            "<iclass=\"far fa-heart\"></i></a></li></ul><a class='cart' href='#'>Thêm vào giỏ hàng</a></div></div><div class='why-text'>" +
            "<h4>" +
            book.title +
            "</h4><h5>" +
            book.basePrice +
            "VND</h5></div></div></div>";
      });
      let allBtn="";
      let pageNumberBar =" <li class='page-item'> <a id='prevBtn' onclick='prevBtnClick()' class='page-link' aria-label='Previous'> <span aria-hidden='true'>&laquo;</span> <span class='sr-only'>Previous</span> </a> </li>"
      for(let i= 1;i<=maxPage;i++){
        allBtn+=`<li  id='page-${i}' class='page-item'><a onclick='setPage(this.textContent)' class='page-link'>${i}</a></li>`;
      }
      allBtn+="<li class='page-item'> <a id='nextBtn' onclick='nextBtnClick()' class='page-link' aria-label='Next'> <span aria-hidden='true'>&raquo;</span> <span class='sr-only'>Next</span> </a> </li>"
      pageNumberBar+=allBtn
      $("#book-list").html(content);
      $(".pagination").html(pageNumberBar);
      inThisPage(currentPage);
    },
    error: function (jqXHR, textStatus, err) {},
  });
};