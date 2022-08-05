const router = require('express').Router();

const ProductController = require('../controllers/product.controller');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken.mdw');

//Get a list of all products
router.get('/', ProductController.getAllProducts);

//Get a product by ProID
router.get('/:id', ProductController.findProductById);

//Create a new product
router.post('/', verifyTokenAndAdmin, ProductController.createNewProduct);

//Update a product by ProID
router.patch('/:id', verifyTokenAndAdmin, ProductController.updateAProduct);

//Delete a product by ProID
router.delete('/:id', verifyTokenAndAdmin, ProductController.deleteAProduct);

module.exports = router;
