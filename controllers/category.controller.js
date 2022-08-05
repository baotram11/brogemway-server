const Category = require('../models/category.model');
const Product = require('../models/product.model');

const CategoryController = {
    getAllCategories: async (req, res, next) => {
        try {
            const results = await Category.find();

            var length = Object.keys(results).length;

            if (!length) {
                return res.status(404).json({ error: 'No categories found!' });
            }

            res.send(results);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },

    findProductsByCatId: async (req, res, next) => {
        const id = req.params.id;
        try {
            const results = await Product.find({ CatID: id });

            var length = Object.keys(results).length;

            if (!length) {
                return res.status(404).json({ error: 'Category is empty!' });
            }

            res.send(results);
        } catch (error) {
            res.status(400).json({ error: 'Invalid Category id' });
            next();
        }
    },

    createNewCategory: async (req, res, next) => {
        try {
            const catID = req.body.CatID;
            const catName = req.body.CatName;

            const newCategory = new Category({
                CatID: catID,
                CatName: catName,
            });

            const result = await newCategory.save();
            res.send(result);
        } catch (error) {
            res.status(422).json({ error: error.message });
            next();
        }
    },

    updateACategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const result = await Category.findOneAndUpdate(
                { CatID: id },
                updates
            );

            if (!result) {
                return res
                    .status(404)
                    .json({ error: 'Category does not exist!' });
            }

            res.send('Updated!');
        } catch (error) {
            res.status(400).json('Error: ' + error);
            next();
        }
    },

    deleteACategory: async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await Category.findOneAndDelete({
                CatID: id,
            });

            if (!result) {
                return res
                    .status(404)
                    .json({ error: 'Category does not exist!' });
            }

            res.send(`Deleted the category: ${id} !!`);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },
};

module.exports = CategoryController;
