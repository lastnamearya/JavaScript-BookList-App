// Book Constructor
// It'll handle the actual Book Object 

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// It's a set of Prototype methods to do things like add book to the list, delete the book, show the alert, do things that has to do with the UI that'll most of the work

function UI() {
  
}

// Add Book to List
UI.prototype.addBookToList = function(book) {

  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');

  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {

  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Add Book to List
  ui.addBookToList(book);

  // Clear Fields
  ui.clearFields();
  

  e.preventDefault();
});
