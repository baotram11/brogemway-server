const AccountController = require('../controllers/account.controller');

const router = require('express').Router();
const {
	verifyToken,
	verifyTokenAndAdmin,
	verifyTokenAndUserAuthorization,
} = require('../middlewares/verifyToken.mdw');

//Get a list of all Accounts
router.get('/', verifyTokenAndAdmin, AccountController.getAllAccounts);

//Get an Account by UserID
router.get('/:id', verifyToken, AccountController.findAccountById);

//Update an Account by UserID
router.patch('/:id', verifyTokenAndUserAuthorization, AccountController.updateAccount);

//Lock an Account by UserID
router.patch('/lock/:id', verifyTokenAndAdmin, AccountController.lockAccount);

//Unlock an Account by UserID
router.patch('/unlock/:id', verifyTokenAndAdmin, AccountController.unlockAccount);

//delete an account
// router.delete("/:id", verifyTokenAndUserAuthorization, AccountController.deleteUser);

module.exports = router;
