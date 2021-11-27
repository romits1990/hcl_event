const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            default: 'books detective thriller ghost romantic scifi'
        },
        fee: {
            type: Number,
            required: true,
            trim: true
        },
        borrowedStatus: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const model = mongoose.model('Book', bookSchema);
module.exports = model;