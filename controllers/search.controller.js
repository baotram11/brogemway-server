const Product = require('../models/product.model');

const SearchController = {
	searchProByName: async (req, res, next) => {
		const param = req.query.q;

		try {
			const result = await Product.find({
				ProName: { $regex: param.replaceAll('%', ' '), $options: 'i' },
			});
			if (!result) {
				return res.status(404).json({ error: 'Product does not exist!' });
			}
			var length = Object.keys(result).length;
			if (!length) {
				return res.status(404).json({ error: 'Product does not exist!' });
			}
			res.send(result);
		} catch (error) {
			res.status(400).json({ error: error.message });
			next();
		}
	},
};

module.exports = SearchController;
