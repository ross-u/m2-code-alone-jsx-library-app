const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the schema

const bookSchema = new Schema (
    {
        title: String,
        description: String,
        rating: Number,
        authors: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

//Creating the model
const Book = mongoose.model('Book', bookSchema);

//Exporting the model
module.exports = Book;