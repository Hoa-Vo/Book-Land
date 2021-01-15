let pTagContent;
let userID;
function addToCart(_id) {
  if (userID === "") {
    let books = localStorage.getItem("books");
    if (books !== null) {
      let data = [];
      data = JSON.parse(books);
      let temp = [];
      temp = checkIsExistInCart(data, _id);
      if (temp) {
        data = temp;
      } else {
        const book = {
          id: _id,
          quantity: 1,
        };
        data.push(book);
      }
      window.localStorage.setItem("books", JSON.stringify(data));
      updateCartApi(data);
    } else {
      let data = [];
      const book = {
        id: _id,
        quantity: 1,
      };
      data.push(book);
      window.localStorage.setItem("books", JSON.stringify(data));
      updateCartApi(data);
    }
  } else {
    addBookToUserCart(_id);
  }
}
function checkIsExistInCart(books, id, quantity) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      if (quantity) {
        books[i].quantity += quantity;
        return books;
      } else {
        books[i].quantity++;
        return books;
      }
    }
  }
  return null;
}
$(document).ready(() => {
  pTagContent = $("#user-info").html();
  userID = pTagContent.split(">")[1].split("<")[0];
  if (userID === "") {
    let books = localStorage.getItem("books");
    let data = [];
    data = JSON.parse(books);
    updateCartApi(data);
  } else {
    localStorage.clear();
    getUserCartInfoApi(userID);
  }
});
function updateCartHtml(books) {
  try {
    let totalMoney = 0;
    for (let i = 0; i < books.length; i++) {
      totalMoney += books[i].totalPrice;
    }
    for (const book of books) {
      book.totalPrice = book.totalPrice.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      book.sellPrice = book.sellPrice.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }
    const source = $("#cart").html();
    const template = Handlebars.compile(source);
    $("#cart-list").html(template(books));
    totalMoney = totalMoney.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    $("#total-money").html(`<strong>Tổng cộng: </strong>${totalMoney} `);
    $("#checkout-money").html(`${totalMoney}`);
    $("#total-money-pay").html(`${totalMoney} `);
  } catch (err) {
    console.log(err);
  }
  try {
    const cartPageSource = $("#cart-page").html();
    const templateCartPage = Handlebars.compile(cartPageSource);
    for (const book of books) {
      book.totalPrice = book.totalPrice.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }
    $("#cart-table").html(templateCartPage(books));
  } catch (err) {
    console.log(err);
  }
}
function isNumberKey(evt) {
  const charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}
function updateCartApi(data) {
  $(".loader").css("display", "flex");

  $.ajax({
    url: "/api/get-cart",
    type: "GET",
    data: {
      cart: data,
    },
    success: function (res) {
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Tổng cộng: </strong> 0 đ</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
        $(".loader").css("display", "none");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
        $(".loader").css("display", "none");
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function removeItemFromCart(_id) {
  if (userID === "") {
    let books = localStorage.getItem("books");
    if (books !== null) {
      let data = [];
      data = JSON.parse(books);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === _id) {
          data.splice(data.indexOf(data[i]), 1);
        }
      }
      window.localStorage.setItem("books", JSON.stringify(data));
      updateCartApi(data);
    }
  } else {
    removeBookFromUserCart(_id);
  }
}

function updateItemFromCart(_id, value) {
  if (userID === "") {
    if (value === "0") {
      removeItemFromCart(_id);
    } else if (value !== "" && isNaN(value) === false) {
      let books = localStorage.getItem("books");
      if (books !== null) {
        let data = [];
        data = JSON.parse(books);
        data = updateQuantity(_id, value, data);
        window.localStorage.setItem("books", JSON.stringify(data));
        updateCartApi(data);
      }
    } else {
      alert("Giá trị phải là số nguyên");
    }
  } else {
    if (value !== "" && isNaN(value) === false) {
      updateItemFromUserCart(_id, value);
    } else {
      alert("Giá trị phải là số nguyên");
    }
  }
}
function updateQuantity(id, value, books) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].quantity = value;
      return books;
    }
  }
}

function getUserCartInfoApi(userID) {
  $(".loader").css("display", "flex");
  $.ajax({
    url: "/api/get-cart/user",
    type: "GET",
    data: {
      userID: userID,
    },
    success: function (res) {
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 đ</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
        $(".loader").css("display", "none");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
        $(".loader").css("display", "none");
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function addBookToUserCart(_id) {
  $(".loader").css("display", "flex");
  const quantity = parseInt($(".quantity").val());
  $.ajax({
    url: "/api/add-book-to-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
      quantity: quantity,
    },
    success: function (res) {
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 đ</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
        $(".loader").css("display", "none");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
        $(".loader").css("display", "none");
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function removeBookFromUserCart(_id) {
  $(".loader").css("display", "flex");
  $.ajax({
    url: "/api/del-book-from-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
    },
    success: function (res) {
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 đ</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
        $(".loader").css("display", "none");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
        $(".loader").css("display", "none");
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function updateItemFromUserCart(_id, value) {
  $(".loader").css("display", "flex");
  $.ajax({
    url: "/api/update-book-from-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
      quantity: value,
    },
    success: function (res) {
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 đ</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
        $(".loader").css("display", "none");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
        $(".loader").css("display", "none");
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}

function addToCartFromDetail(_id) {
  const quantity = parseInt($(".quantity").val());
  if (userID === "") {
    let books = localStorage.getItem("books");
    if (books !== null) {
      let data = [];
      data = JSON.parse(books);
      let temp = [];
      temp = checkIsExistInCart(data, _id, quantity);
      if (temp) {
        data = temp;
      } else {
        const book = {
          id: _id,
          quantity: quantity,
        };
        data.push(book);
      }
      window.localStorage.setItem("books", JSON.stringify(data));
      updateCartApi(data);
    } else {
      let data = [];
      const book = {
        id: _id,
        quantity: quantity,
      };
      data.push(book);
      window.localStorage.setItem("books", JSON.stringify(data));
      updateCartApi(data);
    }
  } else {
    addBookToUserCart(_id);
  }
}
