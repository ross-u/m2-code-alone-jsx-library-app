const Book = require("./../models/Book.model");

// IMPORT THE MODEL
const Book = require("./../models/Book.model");

// POST	/books/add

booksRouter.post("/add", (req, res, next) => {
    // Destructure the values coming from the POST form
    const { title, author, description, rating } = req.body;

    Book.create({ title, author, description, rating })
    .then((book) => {
        res.redirect("/books");
    }) 
    .catch((err) => console.log(err));
});