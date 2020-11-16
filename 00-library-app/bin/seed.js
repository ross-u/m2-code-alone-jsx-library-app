const mongoose = require("mongoose");
const Book = require("./../models/Book.model");
const Author = require("./../models/Author.model");

const books = require("./books-mock-data");
const authors = require("./authors-mock-data");

const DB_NAME = "library";

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) =>{
      const pr = x.connection.dropDatabase();
      return pr;
  })
  .then(() =>{
      const pr = Author.create(authors);
      return pr;
  })
  .then((createdAuthors) => {
      console.log(`Created ${createdAuthors.lenght} authors`);

      const updatedBooks = books.map((bookObj, i) =>{
          const author = createdAuthors[i];
          bookObj.authors = [author._id];

          return bookObj;
      });
      
      const pr = Book.create(updatedBooks);
      return pr;
  })
  .then((createdBooks) =>{
      console.log(`Inserted ${createdBooks.legth} books`);
      mongoose.connection.close();
  })
  .catch((err) => console.log(err));
