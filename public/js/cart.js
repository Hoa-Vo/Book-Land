function addToCart(_id) {
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
  console.log(localStorage.getItem("books"));
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
  let books = localStorage.getItem("books");
  let data = [];
  data = JSON.parse(books);
  updateCartApi(data);
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
    $("#total-money").html(`<strong>Total: </strong> ${totalMoney}VND`);
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
function updateCartApi(data) {
  $.ajax({
    url: "/api/get-cart",
    type: "GET",
    data: {
      cart: data,
    },
    success: function (res) {
      console.log(res);
      if (res == "empty") {
        $("#cart-list").html(`<li>Empty</li><li class="total">
			<a href="#" class="btn btn-default hvr-hover btn-cart">VIEW CART</a>
			<span class="float-right"><strong>Total: </strong> 0 VND</span>
		</li>`);
        $("#total-items").html("0");
        $("#cart-table").html("<div>Empty</div>");
      } else {
        updateCartHtml(res);
        $("#total-items").html(res.length);
      }
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function removeItemFromCart(_id) {
  let books = localStorage.getItem("books");
  if (books !== null) {
    let data = [];
    data = JSON.parse(books);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === _id) {
        console.log(data.indexOf(data[i]));
        data.splice(data.indexOf(data[i]), 1);
      }
    }
    console.log(data);
    window.localStorage.setItem("books", JSON.stringify(data));
    updateCartApi(data);
  }
}
