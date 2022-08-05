const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        CatID: {
            type: String,
            unique: true,
            required: true,
        },
        CatName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
