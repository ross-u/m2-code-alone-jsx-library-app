const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the schema

const authorSchema = new Schema({
    name:String,
    lastname: String,
    nationality: String,
    birthday: Date,
    pictureUrl: String,
});

// create the model
const Author = mongoose.model("Author", authorSchema);

//export the model
module.exports = Author;