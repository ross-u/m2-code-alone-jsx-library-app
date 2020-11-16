const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the schema
const authorSchema = new Schema ({
    name: String,
    lastName: String,
    nationality: String,
    birthday: Date,
    pictureUrl: String,
});

//Creating the model
const Author = mongoose.model('Author', authorSchema);

//Exporting the model
module.exports = Author;