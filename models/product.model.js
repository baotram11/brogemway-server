const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        ProID: {
            type: String,
            required: true,
            unique: true,
        },
        ProName: {
            type: String,
            required: true,
        },
        Price: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        CatID: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
