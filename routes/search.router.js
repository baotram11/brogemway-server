const router = require('express').Router();

const SearchController = require('../controllers/search.controller');

router.get('/product', SearchController.searchProByName);

module.exports = router;
