const cardsContainer = document.querySelector('#cardsContainer')

let myLibrary = [];

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
}

function display() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.innerHTML = `<p style='font-size:20px'><b>${book.title}</b></p><p>Written by ${book.author}</p><p>${book.pages} pages</p>${(book.isRead) ? `<p style='color:#a3be8c'>You read this book</p>` : `<p style='color:#bf616a'>You didn't read this book</p>`}`;
        cardsContainer.appendChild(bookCard)
    })
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const NineteenEightyFour = new Book('1984', 'George Orwell', 265, false);


addBookToLibrary(theHobbit)
addBookToLibrary(NineteenEightyFour)

display()