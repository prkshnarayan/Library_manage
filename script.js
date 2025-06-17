var books = [];
var borrowed = [];

function addBook() {
  var title = document.getElementById("title").value.trim();
  var author = document.getElementById("author").value.trim();
  var isbn = document.getElementById("isbn").value.trim();

  if (!title || !author || !isbn) {
    alert("Please fill all the fields");
    return;
  }

  var exists = books.some(book => book.isbn === isbn) || borrowed.some(entry => entry.book.isbn === isbn);
  if (exists) {
    alert("This ISBN already exists in the system.");
    return;
  }

  books.push({ title, author, isbn });
  displayBooks();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

function displayBooks() {
  var table = document.getElementById("book-table");
  table.innerHTML = "";

  books.forEach(book => {
    var row = table.insertRow();
    row.insertCell(0).innerText = book.title;
    row.insertCell(1).innerText = book.author;
    row.insertCell(2).innerText = book.isbn;
  });
}

function displayBorrowed() {
  var table = document.getElementById("borrowed-table");
  table.innerHTML = "";

  borrowed.forEach(entry => {
    var row = table.insertRow();
    row.insertCell(0).innerText = entry.student;
    row.insertCell(1).innerText = entry.book.title;
    row.insertCell(2).innerText = entry.book.isbn;
  });
}

function borrowBook() {
  var student = document.getElementById("student").value.trim();
  var isbn = document.getElementById("borrowIsbn").value.trim();

  if (!student || !isbn) {
    alert("Enter student name and book ISBN.");
    return;
  }

  var index = books.findIndex(book => book.isbn === isbn);
  if (index === -1) {
    alert("Book not available.");
    return;
  }

  var book = books.splice(index, 1)[0];
  borrowed.push({ student, book });

  displayBooks();
  displayBorrowed();

  document.getElementById("student").value = "";
  document.getElementById("borrowIsbn").value = "";
}

function returnBook() {
  var isbn = document.getElementById("returnIsbn").value.trim();

  var index = borrowed.findIndex(entry => entry.book.isbn === isbn);
  if (index === -1) {
    alert("This book is not in the borrowed list.");
    return;
  }

  var book = borrowed.splice(index, 1)[0].book;
  books.push(book);

  displayBooks();
  displayBorrowed();

  document.getElementById("returnIsbn").value = "";
}
