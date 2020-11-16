const express = require("express");
const Book = require("../models/Book.model");
const booksRouter = express.Router();
const router = express.Router();

// GET /books
booksRouter.get("/", function(req, res, next) {
    Book.find()
    .then((allBooksFromDB) => {
        const props = { books: allBooksFromDB };
        res.render("books", props);
    })
    .catch((err) => console.log(err));
});

booksRouter.get("/add", function (req, res, next) {
    res.render("AddBook");
});


module.exports = router;
module.exports = booksRouter;