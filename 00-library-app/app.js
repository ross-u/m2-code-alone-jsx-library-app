require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const erv = require('express-react-views');
const bodyParser = require("body-parser");


const booksRouter = require('./routes/booksRouter');
const authorsRouter = require("./routes/authorsRouter");


const app = express();
const DB_NAME = 'library';

//DB connection 
mongoose
    .connect(`mongodb://localhost:27017/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((x) => {
        console.log(`Connected to DB: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.log('Error connecting to Mongo', err);
    });

//View engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', erv.createEngine());


//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // <== ADD

// parse application/json
app.use(bodyParser.json()); // <== ADD

//Routes
app.get('/', (req, res, next) => {
    res.render('Home');
})

app.use('/books', booksRouter);
app.use("/authors", authorsRouter);


module.exports = app;

