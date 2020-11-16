const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the schema

const bookSchema = new Schema (
    {
        title: String,
        description: String,
        rating: Number,
        authors: [{ type: Schema.Types.ObjectId, ref: "Author"}],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

// create the model
const Book = mongoose.model("Book", bookSchema);

// export the model
module.exports = Book;