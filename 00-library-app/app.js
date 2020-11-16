require("dotenv").config();
var express = require('express');
const mongoose = require("mongoose");
const erv = require("express-react-views");
const DB_NAME = "library";
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser"); // <== REQUIRE `body-parser`

const booksRouter = require("./routes/booksRouter")

var app = express();

//  DB CONNECTION
mongoose
.connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then((x) => {
    console.log(`Connected to DB:"${x.connections[0].name}"`);
})
.catch((err) => {
    console.error("Error connecting to mongo", err);
});

// VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

// MIDDLEWARE


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app.use(express.static(__dirname + "/public"));



app.use("/books", booksRouter);

// home page route - renders the `Home.jsx`
app.get("/", (req, res, next) => {
    res.render("Home");
});

module.exports = app;
