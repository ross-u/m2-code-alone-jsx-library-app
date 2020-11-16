const express = require("express");
const router = express.Router();
const Book = require("./../models/Book.model");
const Author = require("./../models/Author.model");

// POST /authors/add
router.post("/add", (req, res, next) => {
  const { bookid } = req.query;

  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  // Above destructuring is same as doing:
  // const name = req.body.name;
  // const lastName = req.body.lastName;
  // const nationality = req.body.nationality;
  // const birthday = req.body.birthday;
  // const pictureUrl = req.body.pictureUrl;

  // First we create the new author
  Author.create({ name, lastName, nationality, birthday, pictureUrl })
    .then((createdAuthor) => {
      // Then we update the book we are editing

      const pr = Book.findByIdAndUpdate(
        bookid,
        { $push: { authors: createdAuthor._id } },
        { new: true }
      );

      return pr;
    })
    .then((updatedBook) => {
      res.redirect(`/books/details/${updatedBook._id}`);
    })
    .catch((error) => console.log(error));
});

module.exports = router;