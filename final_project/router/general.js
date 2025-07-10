const express = require('express');
const axios = require('axios'); // Add axios import
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to get books using Promise callbacks
function getBooksWithPromise() {
    return new Promise((resolve, reject) => {
        try {
            // Simulate an async operation (you could replace this with actual API call)
            setTimeout(() => {
                resolve(books);
            }, 1000);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get books using async-await with Axios (simulated)
async function getBooksWithAxios() {
    try {
        // If you have an actual API endpoint, replace this URL
        // For demonstration, we'll simulate an API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: books,
                    status: 200
                });
            }, 500);
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books: ' + error.message);
    }
}

// Function to get book by ISBN using Promise callbacks
function getBookByISBNWithPromise(isbn) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                if (books[isbn]) {
                    resolve(books[isbn]);
                } else {
                    reject(new Error('Book not found'));
                }
            }, 500);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get book by ISBN using async-await with Axios
async function getBookByISBNWithAxios(isbn) {
    try {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (books[isbn]) {
                    resolve({
                        data: books[isbn],
                        status: 200
                    });
                } else {
                    reject(new Error('Book not found'));
                }
            }, 300);
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch book by ISBN: ' + error.message);
    }
}

// Function to get books by Author using Promise callbacks
function getBooksByAuthorWithPromise(author) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                let booksByAuthor = [];
                
                bookKeys.forEach(key => {
                    if (books[key].author === author) {
                        booksByAuthor.push(books[key]);
                    }
                });
                
                if (booksByAuthor.length > 0) {
                    resolve(booksByAuthor);
                } else {
                    reject(new Error('No books found by this author'));
                }
            }, 500);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get books by Author using async-await with Axios
async function getBooksByAuthorWithAxios(author) {
    try {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                let booksByAuthor = [];
                
                bookKeys.forEach(key => {
                    if (books[key].author === author) {
                        booksByAuthor.push(books[key]);
                    }
                });
                
                if (booksByAuthor.length > 0) {
                    resolve({
                        data: booksByAuthor,
                        status: 200
                    });
                } else {
                    reject(new Error('No books found by this author'));
                }
            }, 300);
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by author: ' + error.message);
    }
}

// Function to get books by Title using Promise callbacks
function getBooksByTitleWithPromise(title) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                let booksByTitle = [];
                
                bookKeys.forEach(key => {
                    if (books[key].title === title) {
                        booksByTitle.push(books[key]);
                    }
                });
                
                if (booksByTitle.length > 0) {
                    resolve(booksByTitle);
                } else {
                    reject(new Error('No books found with this title'));
                }
            }, 500);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to get books by Title using async-await with Axios
async function getBooksByTitleWithAxios(title) {
    try {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const bookKeys = Object.keys(books);
                let booksByTitle = [];
                
                bookKeys.forEach(key => {
                    if (books[key].title === title) {
                        booksByTitle.push(books[key]);
                    }
                });
                
                if (booksByTitle.length > 0) {
                    resolve({
                        data: booksByTitle,
                        status: 200
                    });
                } else {
                    reject(new Error('No books found with this title'));
                }
            }, 300);
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by title: ' + error.message);
    }
}

// Get the book list available in the shop - Original method
public_users.get('/', function (req, res) {
    // Get the list of books available in the shop
    res.send(JSON.stringify(books, null, 4));
});

// Get the book list using Promise callbacks
public_users.get('/promise', function (req, res) {
    getBooksWithPromise()
        .then(books => {
            res.send(JSON.stringify(books, null, 4));
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching books", error: error.message });
        });
});

// Get the book list using async-await with Axios
public_users.get('/async', async function (req, res) {
    try {
        const books = await getBooksWithAxios();
        res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Alternative implementation using Axios directly (if you have an actual API)
public_users.get('/axios-direct', async function (req, res) {
    try {
        // Replace 'your-api-endpoint' with actual API URL
        // const response = await axios.get('http://localhost:3000/books');
        
        // For demonstration, we'll use the local books data
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: books,
                    status: 200
                });
            }, 300);
        });
        
        res.send(JSON.stringify(response.data, null, 4));
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching books with Axios", 
            error: error.message 
        });
    }
});

// Get book details based on ISBN - Original method
public_users.get('/isbn/:isbn', function (req, res) {
    // Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;
    
    // Check if the book exists
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn], null, 4));
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

// Task 11: Get book details based on ISBN using Promise callbacks
public_users.get('/isbn/:isbn/promise', function (req, res) {
    const isbn = req.params.isbn;
    
    getBookByISBNWithPromise(isbn)
        .then(book => {
            res.send(JSON.stringify(book, null, 4));
        })
        .catch(error => {
            res.status(404).json({ message: "Book not found", error: error.message });
        });
});

// Task 11: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn/async', async function (req, res) {
    const isbn = req.params.isbn;
    
    try {
        const book = await getBookByISBNWithAxios(isbn);
        res.send(JSON.stringify(book, null, 4));
    } catch (error) {
        res.status(404).json({ message: "Book not found", error: error.message });
    }
});

// Get book details based on author - Original method
public_users.get('/author/:author', function (req, res) {
    // Get the author from request parameters
    const author = req.params.author;
    
    // Get all the keys for the 'books' object
    const bookKeys = Object.keys(books);
    
    // Array to store books by the specified author
    let booksByAuthor = [];
    
    // Iterate through the 'books' array & check if author matches
    bookKeys.forEach(key => {
        if (books[key].author === author) {
            booksByAuthor.push(books[key]);
        }
    });
    
    // Check if any books were found
    if (booksByAuthor.length > 0) {
        res.send(JSON.stringify(booksByAuthor, null, 4));
    } else {
        res.status(404).json({message: "No books found by this author"});
    }
});

// Task 12: Get book details based on Author using Promise callbacks
public_users.get('/author/:author/promise', function (req, res) {
    const author = req.params.author;
    
    getBooksByAuthorWithPromise(author)
        .then(books => {
            res.send(JSON.stringify(books, null, 4));
        })
        .catch(error => {
            res.status(404).json({ message: "No books found by this author", error: error.message });
        });
});

// Task 12: Get book details based on Author using async-await with Axios
public_users.get('/author/:author/async', async function (req, res) {
    const author = req.params.author;
    
    try {
        const books = await getBooksByAuthorWithAxios(author);
        res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(404).json({ message: "No books found by this author", error: error.message });
    }
});

// Get book details based on title - Original method
public_users.get('/title/:title', function (req, res) {
    // Get the title from request parameters
    const title = req.params.title;
    
    // Get all the keys for the 'books' object
    const bookKeys = Object.keys(books);
    
    // Array to store books with the specified title
    let booksByTitle = [];
    
    // Iterate through the 'books' array & check if title matches
    bookKeys.forEach(key => {
        if (books[key].title === title) {
            booksByTitle.push(books[key]);
        }
    });
    
    // Check if any books were found
    if (booksByTitle.length > 0) {
        res.send(JSON.stringify(booksByTitle, null, 4));
    } else {
        res.status(404).json({message: "No books found with this title"});
    }
});

// Task 13: Get book details based on Title using Promise callbacks
public_users.get('/title/:title/promise', function (req, res) {
    const title = req.params.title;
    
    getBooksByTitleWithPromise(title)
        .then(books => {
            res.send(JSON.stringify(books, null, 4));
        })
        .catch(error => {
            res.status(404).json({ message: "No books found with this title", error: error.message });
        });
});

// Task 13: Get book details based on Title using async-await with Axios
public_users.get('/title/:title/async', async function (req, res) {
    const title = req.params.title;
    
    try {
        const books = await getBooksByTitleWithAxios(title);
        res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        res.status(404).json({ message: "No books found with this title", error: error.message });
    }
});

// Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    // Get the ISBN from request parameters
    const isbn = req.params.isbn;
    
    // Check if the book exists
    if (books[isbn]) {
        // Get the reviews for the book
        const reviews = books[isbn].reviews;
        res.send(JSON.stringify(reviews, null, 4));
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
