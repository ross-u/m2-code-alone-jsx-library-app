const express = require("express");
const booksRouter = express.Router();

booksRouter.get("/", (req, res, next) => {
    res.render("Books");
  });
  

module.exports = booksRouter;