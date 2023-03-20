const newBookButton = document.querySelector('#new-book');
const newBookForm = document.querySelector('#new-book-form');

newBookButton.addEventListener('click', () => {
	newBookForm.style.display = 'block';
});

newBookForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const read = document.querySelector('#read').checked;

	addBookToLibrary(title, author, pages, read);

	// Clear input fields
	newBookForm.reset();

	// Hide form
	newBookForm.style.display = 'none';

	// Update display
	displayBooks();
});

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
}

function displayBooks() {
	const library = document.querySelector('#library');
	library.innerHTML = '';
	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book-card');
		bookCard.setAttribute('data-index', index);

		const title = document.createElement('h2');
		title.textContent = book.title;
		bookCard.appendChild(title);

		const author = document.createElement('p');
		author.textContent = `by ${book.author}`;
		bookCard.appendChild(author);

		const pages = document.createElement('p');
		pages.textContent = `${book.pages} pages`;
		bookCard.appendChild(pages);

		// Add read status button
		const readStatusButton = document.createElement('button');
		readStatusButton.textContent = book.read ? 'Read' : 'Not Read';

		// Add event listener to read status button
		readStatusButton.addEventListener('click', () => {
			myLibrary[index].read = !myLibrary[index].read;
			displayBooks();
		});

		// Append button to card
		bookCard.appendChild(readStatusButton);

		// Add remove button
		const removeButton = document.createElement('button');
		removeButton.textContent = 'Remove';

		// Add event listener to remove button
		removeButton.addEventListener('click', () => {
			myLibrary.splice(index, 1);
			displayBooks();
		});

		// Append button to card
		bookCard.appendChild(removeButton);

		// Append card to library
		library.appendChild(bookCard);
	});
}
