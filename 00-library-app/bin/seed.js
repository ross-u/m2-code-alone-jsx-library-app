const mongoose = require('mongoose');
const Book = require('./../models/Book.model');
const Author = require('./../models/Author.model');

const books = require('./books-mock-data');
const authors = require('./authors-mock-data');

const DB_NAME = 'library';

//Seed Sequence

//Establish Connection to Mongo DB
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then((x) =>{
    //dropping the database
    const pr = x.connection.dropDatabase();
    return pr;
})
.then(() =>{
    //create the documents from the array of authors
    const pr = Author.create(authors);
    return pr; //forwards promise to next `then`
})
.then((createdAuthors) =>{
    console.log(`Created ${createdAuthors.length} authors`);
    //Now that .create() operation is done for authors,
    //update the objects in the array of books

    const updatedBooks = books.map((bookObj, i) => {
        //Updating the bookObj and setting the corresponding
        //author id to create the reference
        const author = createdAuthors[i];
        bookObj.authors = [author._id]
        return bookObj; //return the updated bookObj
    });
    
    const pr = Book.create(updatedBooks);
    return pr; //forwards promise to next `then`
})
.then ((createdBooks) => {
    //When .create() operation is finished, close DB Connection
    console.log(`Inserted ${createdBooks.length} books`);

    mongoose.connection.close();
})
.catch((err) => console.log(err));