const Account = require('../models/account.model');

AccountController = {
    getAllAccounts: async (req, res, next) => {
        try {
            const results = await Account.find();

            var length = Object.keys(results).length;

            if (!length) {
                return res.status(404).json({ error: 'No accounts found!' });
            }
            res.send(results);
        } catch (error) {
            res.status(400).json('Error: ' + error);
            next();
        }
    },

    findAccountById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Account.findById(id);

            var length = Object.keys(result).length;

            if (!length) {
                return res
                    .status(404)
                    .json({ error: 'Account does not exist!' });
            }

            res.send(result);
        } catch (error) {
            res.status(400).json('Error: ' + error);
            next();
        }
    },

    updateAccount: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const result = await Account.findByIdAndUpdate(id, updates);

            if (!result) {
                return res
                    .status(404)
                    .json({ error: 'Account does not exist!' });
            }

            res.send({ status: 'updated' });
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },

    lockAccount: async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await Account.findByIdAndUpdate(id, {
                IsActive: false,
            });

            if (!result) {
                return res
                    .status(404)
                    .json({ error: 'Account does not exist!' });
            }

            res.send(`Locked the Account: ${id} !!`);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },

    unlockAccount: async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await Account.findByIdAndUpdate(id, {
                IsActive: true,
            });

            if (!result) {
                return res
                    .status(404)
                    .json({ error: 'Account does not exist!' });
            }

            res.send(`Activated the account: ${id} !!`);
        } catch (error) {
            res.status(400).json({ error: error.message });
            next();
        }
    },
};

module.exports = AccountController;
