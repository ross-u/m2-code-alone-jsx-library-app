require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const erv = require ("express-react-views")

const booksRouter = require("./routes/booksRouter");

const DB_NAME = "library";

const app = express();


//DB CONNECTION
mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(`Connected to DB: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });


//VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());


//MIDDLEWARE
app.use(express.static(__dirname + "/public"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/books", booksRouter);

//ROUTES
app.get("/", (req, res, next) => {
    res.render("Home");
  });



module.exports = app;
