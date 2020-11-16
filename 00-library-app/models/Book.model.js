const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: String,
        description: String,
        rating: Number,
        authors: [{ type: Schema.Types.ObjectId, ref: "Author" }]
    },
    {
        timestamps: {
            // https://mongoosejs.com/docs/guide.html#timestamps
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book; 
