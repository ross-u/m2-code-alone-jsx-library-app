const express = require('express');
const booksRouter = express.Router();
const Book = require('./../models/Book.model');
const Author = require ('./../models/Author.model');


booksRouter.get('/', function(req, res, next) {
    Book.find()
      .then((allBooksFromDB) =>{
          const props = {books: allBooksFromDB};
          res.render('books', props);
      })
      .catch((err) => console.log(err)); 
});

booksRouter.get('/add', function(req,res,next) {
    res.render('AddBook');
});

booksRouter.post('/add', (req, res, next)=> {
    //Destructure values coming from the POST form
    const {title, author, description, rating} = req.body;

    Book.create({ title, author, description, rating })
    .then((book) => {
        res.redirect('/books');
    })
    .catch((err) => console.log(err));
});

booksRouter.get('/edit', (req, res, next)=> {
    //Get the book id passed via the link.
    // a href = "/books/edit?bookid=123"
    const { bookid } = req.query;

    //Find the specific boook by `_id`
    Book.findOne({_id: bookid})
    .then((oneBook)=> {
        const props = { oneBook: oneBook };
        res.render('EditBook', props);
    })
    .catch((err) => console.log(err));
})

//POST /books/edit
booksRouter.post("/edit", (req, res, next) => {
    const { bookid } = req.query;
    const { title, author, description, rating } = req.body;
  
    Book.findByIdAndUpdate(
      bookid,
      { title, author, description, rating },
      { new: true }
      //{new : true} is used to get the updated document version returned after the update
    )
      .then((updatedBook) => {
        console.log("book document after the update", updatedBook);
        res.redirect("/books");
      })
      .catch((error) => console.error(error));
  });

  //GET /books/details/:bookId
  booksRouter.get("/details/:bookId", (req, res, next) => {
    const { bookId } = req.params;
  
    Book.findById(bookId)
      .populate('authors') //add .populate('authors')
      .then((oneBook) => {
        const props = { oneBook: oneBook };
  
        res.render("BookDetails", props);
      })
      .catch((err) => console.log("Error retrieving book details: ", err));
  });


module.exports = booksRouter;
