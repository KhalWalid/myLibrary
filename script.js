const cardsContainer = document.querySelector('#cardsContainer');
const form = document.querySelector('form')
const newBookButton = document.querySelector('#newBook')
const cancelButton = document.querySelector('#cancel')
const submitButton = document.querySelector('#submit')
let id = 0

newBookButton.addEventListener('click', () => {
    form.classList.remove('displayForm');
});

cancelButton.addEventListener('click', () => {
    form.classList.add('displayForm');
});

submitButton.addEventListener('click', () => {
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    isRead = document.getElementById('isRead').checked;
    if (title != '' && author != '' && pages != '') {
        formNewBook();
    }
    else return
    form.classList.add('displayForm')
});


let myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `${this.title} by ${author}, ${this.pages} pages, ${(this.isRead) ? `already read.`: `not read yet.`}`
    };
};

function addBookToLibrary(book) {
    myLibrary.push(book)
};

// Display each book on the page and configure the delete buttons at the same time
function display() {
    cardsContainer.innerHTML = ''
    myLibrary.forEach((book,index) => {
        const bookCard = document.createElement('div');
        bookCard.innerHTML = `<p style='font-size:20px'><b>${book.title}</b></p><p>Written by ${book.author}</p><p>${book.pages} pages</p>${(book.isRead) ? `<p style='color:#a3be8c'>You read this book</p>` : `<p style='color:#bf616a'>You didn't read this book</p>`}<button id='deleteButton' data-index='${index}' type='button'>Delete</button>`;
        cardsContainer.appendChild(bookCard)
    });
    deleteButtons = document.querySelectorAll('#deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary.splice(button.dataset.index,1);
            display();
        });
    });
};

function formNewBook() {
    addBookToLibrary(new Book(title, author, pages, isRead))
    display()
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const NineteenEightyFour = new Book('1984', 'George Orwell', 376, false);


addBookToLibrary(theHobbit);
addBookToLibrary(NineteenEightyFour);

display();