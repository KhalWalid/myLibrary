const cardsContainer = document.querySelector('#cardsContainer');
const form = document.querySelector('form')
const newBookButton = document.querySelector('#newBook')
const cancelButton = document.querySelector('#cancel')
const submitButton = document.querySelector('#submit')
const inputs = document.querySelectorAll('input')
let myLibrary = []

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
    if (myLibrary.some((book) => book.title === title)) {
        alert(`Book is already in the library`)
    } else if (title != '' && author != '' && pages != '') {
        formNewBook();
    } else return
    form.classList.add('displayForm')
    inputs.forEach(input => {
        input.value = ``
    })
});

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

// Display each book on the page and configure the delete buttons and read buttons at the same time
function display() {
    cardsContainer.innerHTML = ''
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.innerHTML = `<p style='font-size:20px'><b>${book.title}</b></p><p>Written by ${book.author}</p><p>${book.pages} pages</p>${(book.isRead) ? `<button id="readButton" class='isRead' data-index='${index}'>You read this book</button>` : `<button id="readButton" class='notRead' data-index='${index}'>You didn't read this book</button>`}<button id='deleteButton' data-index='${index}' type='button'>Delete</button>`;
        cardsContainer.appendChild(bookCard)
    });
    deleteButtons = document.querySelectorAll('#deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary.splice(button.dataset.index, 1);
            saveLibrary()
            display();
        });
    });
    readButtons = document.querySelectorAll('#readButton')
    readButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary[button.dataset.index]['isRead'] = !myLibrary[button.dataset.index]['isRead'];
            saveLibrary()
            display()
        });
    });
};

function formNewBook() {
    addBookToLibrary(new Book(title, author, pages, isRead))
    saveLibrary()
    display()
};

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
}

loadLibrary()
display();