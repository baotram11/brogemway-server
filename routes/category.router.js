const CategoryController = require('../controllers/category.controller');

const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken.mdw');

//Get a list of all categories
router.get('/', CategoryController.getAllCategories);

//Get products by CatID
router.get('/:id', CategoryController.findProductsByCatId);

//Create a new category
router.post('/', verifyTokenAndAdmin, CategoryController.createNewCategory);

//Update a category by CatID
router.patch('/:id', verifyTokenAndAdmin, CategoryController.updateACategory);

//Delete a category by CatID
router.delete('/:id', verifyTokenAndAdmin, CategoryController.deleteACategory);

module.exports = router;
