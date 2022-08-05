const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken.mdw');

//register
router.post('/register', AuthController.registerUser);

//login
router.post('/login', AuthController.loginUser);

// logout
router.post('/logout', verifyToken, AuthController.logOut);

// refresh token
router.post('/refresh', AuthController.requestRefreshToken);

module.exports = router;
