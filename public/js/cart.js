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
function checkIsExistInCart(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].quantity++;
      return books;
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
    const source = $("#cart").html();
    const template = Handlebars.compile(source);
    $("#cart-list").html(template(books));
    let totalMoney = 0;
    for (let i = 0; i < books.length; i++) {
      totalMoney += books[i].totalPrice;
    }
    $("#total-money").html(`<strong>Tổng cộng: </strong>${totalMoney} VND`);
    $("#checkout-money").html(`${totalMoney} VND`);
    $("#total-money-pay").html(`${totalMoney} VND`);
  } catch (err) {
    console.log(err);
  }
  try {
    const cartPageSource = $("#cart-page").html();
    const templateCartPage = Handlebars.compile(cartPageSource);
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
  $.ajax({
    url: "api/get-cart",
    type: "GET",
    data: {
      cart: data,
    },
    success: function (res) {
      console.log(res);
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
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
      console.log(data);
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
        console.log(data);
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
  console.log(userID);
  $.ajax({
    url: "api/get-cart/user",
    type: "GET",
    data: {
      userID: userID,
    },
    success: function (res) {
      console.log(res);
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function addBookToUserCart(_id) {
  console.log(userID);
  $.ajax({
    url: "api/add-book-to-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
    },
    success: function (res) {
      console.log(res);
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function removeBookFromUserCart(_id) {
  console.log(userID);
  $.ajax({
    url: "api/del-book-from-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
    },
    success: function (res) {
      console.log(res);
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function updateItemFromUserCart(_id, value) {
  console.log(userID);
  $.ajax({
    url: "api/update-book-from-cart/user",
    type: "GET",
    data: {
      userID: userID,
      bookID: _id,
      quantity: value,
    },
    success: function (res) {
      console.log(res);
      if (res === "empty") {
        $("#cart-list").html(`<li>Giỏ hàng trống</li><li class="total">
			<a href="/cart" class="btn btn-default hvr-hover btn-cart">Xem giỏ hàng</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $(".cart-exist").css("display", "none");
        $("#empty-cart").css("display", "block");
      } else {
        $("#empty-cart").css("display", "none");
        $(".cart-exist").css("display", "auto");
        updateCartHtml(res);
        $("#total-items").html(res.length);
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
