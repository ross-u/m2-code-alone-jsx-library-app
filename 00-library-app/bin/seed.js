const mongoose = require("mongoose");
const Book = require("./../models/Book.model");
const Author = require("./../models/Author.model");

const books = require("./books-mock-data");
const authors = require("./authors-mocks-data");

const DB_NAME = "library";

// SEED SEQUENCE

//0. estabilish connection to mongo database
mongoose
.connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then((x) => {
    // 1. drop database
    const pr = x.connection.dropDatabase();

    return pr;
})
.then(() => {
    // create the documents from array of authors
    const pr = Author.create(authors);
    return pr; // forwards the promise to the next then
})
.then((createdAuthors) => {
    console.log(`Created ${createdAuthors.length} authors`);
// 3. when .create() operation is done update the objects in the array of books
const updateBooks = books.map((bookObj, i) => {
// Update the bookObj and set the corresponding author id
// to create the reference
const author = createdAuthors[i];
bookObj.authors = [author._id];
 
return bookObj; //return the updated bookObj
});
 const pr = Book.create(books);
return pr; // forwards the promise to next then
})
.then((createdBooks) => {
// 4. when .create() operation is done, close db conncection
console.log(`inserted ${createdBooks.length} books`);

mongoose.connection.close();
})
.catch((err) => console.log(err));
