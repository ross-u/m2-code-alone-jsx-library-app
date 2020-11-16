const express = require("express");
const booksRouter = express.Router();

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
  

module.exports = booksRouter;