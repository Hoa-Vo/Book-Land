function filter() {
  isFilterOrder = true;
  const filterOp = $("#basic").val();
  const category_id = document.getElementById("category_id").textContent;
  const searchText = document.getElementById("searchText").value;
  modifyUrl(searchText, category_id, filterOp);
  $.ajax({
    url: "/api/filter/",
    type: "GET",
    data: {
      page: currentPage,
      pagelimit: booksPerPage,
      filterOp: filterOp,
      searchText: searchText,
      category_id: category_id,
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
          element.basePrice = element.basePrice.toLocaleString("it-IT", {
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
