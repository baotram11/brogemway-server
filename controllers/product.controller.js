const Product = require('../models/product.model');

const ProductController = {
    getAllProducts: async (req, res, next) => {
        try {
            const results = await Product.find();

            var length = Object.keys(results).length;

            if (!length) {
                return res.status(404).json({ error: 'No products found!' });
            }

            res.send(results);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },

    findProductById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Product.find({ ProID: id });

            var length = Object.keys(result).length;

            if (!length) {
                return res
                    .status(404)
                    .json({ error: 'Product does not exist!' });
            }

            res.send(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },

    createNewProduct: async (req, res, next) => {
        try {
            const proID = req.body.ProID;
            const proName = req.body.ProName;
            const price = req.body.Price;
            const description = req.body.Description;
            const catID = req.body.CatID;

            const newProduct = new Product({
                ProID: proID,
                ProName: proName,
                Price: price,
                Description: description,
                CatID: catID,
            });

            const result = await newProduct.save();
            res.send(result);
        } catch (error) {
            res.status(422).json({ error: error.message });
            next();
        }
    },

    updateAProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const result = await Product.findOneAndUpdate(
                { ProID: id },
                updates
            );

            var length = Object.keys(result).length;

            if (!length) {
                return res
                    .status(404)
                    .json({ error: 'Product does not exist!' });
            }

            res.send('Updated!!');
        } catch (error) {
            res.status(400).json('Error: ' + error);
            next();
        }
    },

    deleteAProduct: async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await Product.findOneAndDelete({
                ProID: id,
            });

            var length = Object.keys(result).length;

            if (!length) {
                return res
                    .status(404)
                    .json({ error: 'Product does not exist!' });
            }

            res.send(`Deleted the product: ${id} !!`);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },
};

module.exports = ProductController;
