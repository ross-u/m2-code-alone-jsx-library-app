const express = require("express");
const booksRouter = express.Router();

const Book = require("./../models/Book.model");

booksRouter.get("/", (req, res, next) => {
    Book.find()
    .then((allBooksFromDB) =>{
      const props = {books:allBooksFromDB};
      res.render("books", props)
    })
    .catch((err) => console.log(err)); 
  });

  booksRouter.get("/add", function (req, res, next){
    res.render("AddBook");
  });

  booksRouter.post("/add", (req, res, next) => {
    Book.create({ title, author, description, rating })
      .then((book) => {
        res.redirect("/books");
      })
      .catch((err) => console.log(err));
  });

  booksRouter.get("/edit", (req, res, next) => {
    const {bookid} = req.query;
    Book.findOne({_is:bookid})
     .then((oneBook) => {
       const props = {oneBook: oneBook};
       res.render("EditBook", props);
     })
     .catch((err) => console.log(err));
  });
  
  booksRouter.post("/edit", (req, res, next) => {
    const { bookid } = req.query;
    const { title, author, description, rating } = req.body;
  
    Book.findByIdAndUpdate(
      bookid,
      { title, author, description, rating },
      { new: true }
      
    )
      .then((updatedBook) => {
        console.log("book document after the update", updatedBook);
        res.redirect("/books");
      })
      .catch((error) => console.error(error));
  });

  booksRouter.get("/details/:bookId", (req, res, next) => {
    const { bookId } = req.params;
  
    Book.findById(bookId)
      .populate("authors")
      .then((oneBook) => {
        const props = { oneBook: oneBook };
  
        res.render("BookDetails", props);
      })
      .catch((err) => console.log("Error retrieving book details: ", err));
  });

  

module.exports = booksRouter;