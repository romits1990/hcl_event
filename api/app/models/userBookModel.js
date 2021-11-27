const mongoose = require('mongoose');
const { Schema } = mongoose;

// const Book = require("./bookModel");

const userBookSchema = new Schema(
    {
        user: {
            type: String,
            trim: true,
            required: true,
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
            trim: true
        },
        dueDate: {
            type: Date,
            required: true,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
);

const model = mongoose.model('UserBook', userBookSchema);
module.exports = model;