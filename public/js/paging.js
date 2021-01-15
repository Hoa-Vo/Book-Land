let booksPerPage = 6;
let totalBook;
let currentPage = 1;
let maxPage = 0;
let maxButtonPerPage = 5;
let pageNumberBar;
let allBtn = "";
let isPrevNextClick = 0;
let isFilterOrder = false;
let isPaging = true;
let isSearching = false;
let isFilterCategory = false;
let isFilterPublisher = false;
$(document).ready(async () => {
  fetchData(currentPage, booksPerPage);
});
function prevBtnClick() {
  if (currentPage > 1) {
    currentPage--;
    isPrevNextClick = 1;
    fetchData(currentPage, booksPerPage, 1);
    toogleActive(currentPage + 1);
  }
}
function nextBtnClick() {
  if (currentPage < maxPage) {
    isPrevNextClick = 2;
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
  $("#book-list").html("<div id='loading'>Đang tải...</div>");
  const category_id = document.getElementById("category_id").textContent;
  const searchText = document.getElementById("searchText").value;
  modifyUrl(searchText, category_id);
  $.ajax({
    url: "/api/paging/",
    type: "GET",
    data: {
      page: currentPage,
      pagelimit: booksPerPage,
      categoryId: category_id,
      searchText: searchText,
    },
    success: function (res) {
      let content = "";
      let image;
      totalBook = res.data.totalBook;
      if (maxPage === 0) {
        maxPage = Math.ceil(totalBook / booksPerPage);
      }
      if (res.data.books.length > 0) {
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
        for (const element of res.data.books) {
          element.sellPrice = element.sellPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
        }
        updateBookList(res.data.books);
        inThisPage(currentPage);
        if (currentPage === 1) {
          $("#prevBtn").addClass("disabled");
        } else if (currentPage === maxPage) {
          $("#nextBtn").addClass("disabled");
        } else {
          $("#prevBtn").removeClass("disabled");
          $("#nextBtn").removeClass("disabled");
        }
        $("html, body").animate({ scrollTop: 0 }, 600);
      } else {
        $("#book-list").html("<div id='loading'>Không tìm thấy cuốn sách nào</div>");
      }
    },
    error: function (jqXHR, textStatus, err) {
      console.log(err);
    },
  });
}
function updatePagination(btnArr) {
  let content = [];
  btnArr.forEach(element => {
    const temp = { num: `${element}` };
    content.push(temp);
  });
  const source = $("#paging-hbs").html();
  const template = Handlebars.compile(source);
  $("#btn-list").html(template(content));
}
function updateBookList(books) {
  const source = $("#products").html();
  const template = Handlebars.compile(source);
  $("#book-list").html(template(books));
}
function modifyUrl(searchText, categoryId, orderId) {
  if (searchText !== "") {
    isSearching = true;
    isFilterCategory = false;
    isFilterPublisher = false;
  }
  if (categoryId !== "") {
    isFilterCategory = true;
    isSearching = false;
    isFilterPublisher = false;
  }

  if (isPaging && !isFilterCategory && !isFilterOrder && !isSearching && isFilterPublisher) {
    window.history.pushState({}, "paging", `./?page=${currentPage}&pagelimit=${booksPerPage}`);
  }
  if (isPaging && !isFilterCategory && !isFilterOrder && !isSearching && isFilterPublisher) {
    window.history.pushState(
      {},
      "paging",
      `./?publisher=${temp}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && isFilterCategory && !isFilterOrder && !isSearching && !isFilterPublisher) {
    window.history.pushState(
      {},
      "paging",
      `./?categoryId=${categoryId}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && !isFilterCategory && isFilterOrder && !isSearching && !isFilterPublisher) {
    window.history.pushState(
      {},
      "paging",
      `./?orderbyid=${orderId}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && !isFilterCategory && !isFilterOrder && isSearching && !isFilterPublisher) {
    window.history.pushState(
      {},
      "paging",
      `/search/?bookName=${searchText}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && !isFilterCategory && isFilterOrder && !isFilterPublisher && isSearching) {
    window.history.pushState(
      {},
      "paging",
      `/search/?bookName=${searchText}&orderId=${orderId}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && isFilterOrder && !isSearching && isFilterCategory && !isFilterPublisher) {
    window.history.pushState(
      {},
      "paging",
      `./?categoryId=${categoryId}&orderId=${orderId}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  if (isPaging && isFilterOrder && isFilterPublisher && !isFilterPublisher && !isSearching) {
    window.history.pushState(
      {},
      "filter",
      `./filter?publisher=${temp}&orderId=${orderId}&page=${currentPage}&pagelimit=${booksPerPage}`
    );
  }
  isFilterOrder = false;
}
