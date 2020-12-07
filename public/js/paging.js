let booksPerPage = 6;
let totalBook;
let currentPage = 1;
let maxPage = 0;
let maxButtonPerPage = 5;
let pageNumberBar;
let allBtn = "";
$(document).ready(async () => {
  fetchData(currentPage, booksPerPage);
});
function prevBtnClick() {
  if (currentPage > 1) {
    currentPage--;
    fetchData(currentPage, booksPerPage, 1);
    toogleActive(currentPage + 1);
  }
}
function nextBtnClick() {
  if (currentPage < maxPage) {
    currentPage++;
    fetchData(currentPage, booksPerPage, 2);
    toogleActive(currentPage - 1);
  }
}
function inThisPage(currentPage) {
  const id = `page-${currentPage}`;
  document.getElementById(id).classList.add("active");
}
function toogleActive(currentPage) {
  const id = `page-${currentPage}`;
  document.getElementById(id).classList.remove("active");
}
function setPage(num) {
  toogleActive(currentPage);
  currentPage = parseInt(num);
  fetchData(currentPage, booksPerPage, 0);
}
async function fetchData(currentPage, booksPerPage, isPrevNextClick) {
  $("#book-list").html("<div id='loading'>Loading...</div>");
  $.ajax({
    url: "/bookslist/page",
    type: "GET",
    data: {
      page: currentPage,
      pagelimit: booksPerPage,
    },
    success: function (res) {
      let content = "";
      let image;
      totalBook = res.data.totalBook;
      if (maxPage === 0) {
        maxPage = Math.ceil(totalBook / booksPerPage);
      }
      console.log(maxPage);
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
          "<iclass='far fa-heart'></i></a></li></ul><a class='cart' href='#'>Thêm vào giỏ hàng</a></div></div><div class='why-text'>" +
          "<h4>" +
          book.title +
          "</h4><h5>" +
          book.basePrice +
          "VND</h5></div></div></div>";
      });
      if (isPrevNextClick) {
        let btnArr;
        if (isPrevNextClick == 2) {
          btnArr = listOfButtonNext(currentPage, maxButtonPerPage, maxPage);
        } else {
          btnArr = listOfButtonPrev(currentPage, maxButtonPerPage, maxPage);
        }
        pageNumberBar = "empty";
        if (btnArr.length) {
          updatePagination(btnArr);
        }
      }
      if (!pageNumberBar) {
        let btnArr = [];
        let condition = maxPage < maxButtonPerPage ? maxPage : maxButtonPerPage;
        for (let i = 1; i <= condition; i++) {
          btnArr.push(i);
        }
        updatePagination(btnArr);
      }
      $("#book-list").html(content);
      inThisPage(currentPage);
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function updatePagination(btnArr) {
  console.log(maxPage);
  console.log(btnArr);
  allBtn = "";
  pageNumberBar =
    " <li class='page-item'> <a id='prevBtn' onclick='prevBtnClick()' class='page-link' aria-label='Previous'> <span aria-hidden='true'>&laquo;</span> <span class='sr-only'>Previous</span> </a> </li>";
  for (let i = 0; i < btnArr.length; i++) {
    if (btnArr[i] <= maxPage)
      allBtn += `<li  id='page-${btnArr[i]}' class='page-item'><a onclick='setPage(this.textContent)' class='page-link'>${btnArr[i]}</a></li>`;
  }
  allBtn +=
    "<li class='page-item'> <a id='nextBtn' onclick='nextBtnClick()' class='page-link' aria-label='Next'> <span aria-hidden='true'>&raquo;</span> <span class='sr-only'>Next</span> </a> </li>";
  pageNumberBar += allBtn;
  $(".pagination").html(pageNumberBar);
}
