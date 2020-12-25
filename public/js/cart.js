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
  } else {
    let data = [];
    const book = {
      id: _id,
      quantity: 1,
    };
    data.push(book);
    window.localStorage.setItem("books", JSON.stringify(data));
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
