 class Book {
   constructor(title, author, isbn){
     this.title = title;
     this.author = author;
     this.isbn = isbn;
   }
 }

 class UI {
   addBookToList(book) {
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

   showAlert(message, className) {
      // Create a div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add Text
      div.appendChild(document.createTextNode(message));
      // Get Parent
      const container = document.querySelector('.container');

      // Put it before form

      // Get Form
      const form = document.querySelector('#book-form');
      // Insert Alert
      container.insertBefore(div, form);

      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
   }

   deleteBook(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
   }

   clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
   }
}

// Local Storage Class
class Store {

  // It'll take care of fetching them from LocalStorage
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // It'll take care of the book in the UI 
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      // Add Book to UI
      ui.addBookToList(book);
    });
  }

  // Add books to Local Storage
  static addBook(book) {
    // First we get how many books we already have a fixed unchanged value
    const books = Store.getBooks();

    // Added new book to our array using .push method
    books.push(book);
    // Added a key-value pair to our LocalStorage in object syntax, where 'books' is the key and JSON.stringify(books) is the value
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
// We don't need parenthesis here
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

  // Validation
  if(title === "" || author === "" || isbn === ""){
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add Book to List
    ui.addBookToList(book);

    // Add to LocalStorage
    // As it's a static method we don't need to use any object instance here
    Store.addBook(book);

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear Fields
    ui.clearFields();
  }
  
  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
  // Instanitate UI
  const ui = new UI();
  
  // Delete Book
  ui.deleteBook(e.target);

  // Remove from LocalStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show Alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
