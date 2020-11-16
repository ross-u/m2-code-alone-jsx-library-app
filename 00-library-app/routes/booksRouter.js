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
  
  

module.exports = booksRouter;