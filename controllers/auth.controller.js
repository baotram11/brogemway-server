const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Account = require('../models/account.model');

let refreshTokens=[];

const AuthController = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.Level,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '30d' }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.Level,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' }
        );
    },

    registerUser: async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.Password, salt);

            const newAccount = await new Account({
                PhoneNumber: req.body.PhoneNumber,
                Name: req.body.Name,
                Email: req.body.Email,
                Address: req.body.Address,
                IsActive: req.body.IsActive,
                Level: req.body.Level,
                Password: hashed,
                DoB: req.body.DoB,
            });

            const result = await newAccount.save();

            return res.status(200).send({
                success: true,
                account: {
                    ID: result._id,
                    PhoneNumber: result.PhoneNumber,
                    Name: result.Name,
                    Email: result.Email,
                    IsActive: result.IsActive,
                    Level: result.Level,
                    Password: result.Password,
                },
            });
        } catch (error) {
            res.status(422).json({ status: 422, error: error.message });
            next();
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            var user = null;

            if (username.includes('@')) {
                user = await Account.findOne({ Email: username });
            } else {
                user = await Account.findOne({ PhoneNumber: username });
            }

            if (!user) {
                return res.status(404).send({
                    success: false,
                    type: 'username',
                    error: 'Không tìm thấy tài khoản phù hợp',
                });
            }

            const isMatch = await bcrypt.compare(password, user.Password);
            if (!isMatch) {
                return res.status(404).send({
                    success: false,
                    type: 'password',
                    error: 'Mật khẩu chưa chính xác',
                });
            }

            if (user && isMatch) {
                const accessToken = AuthController.generateAccessToken(user);
                const refreshToken = AuthController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure:false,
                    path:'/',
                    sameSite: 'strict'
                })

                const { Password, ...orthers } = user._doc;
                res.status(200).send({
                    success: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    account: { ...orthers },
                });
            }
        } catch (error) {
            res.status(400).send({
                error: error.message,
            });
            next();
        }
    },

    requestRefreshToken: async(req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(200).json('You are not authenticated!');
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
          }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err){
                console.log(err);
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            const newAccessToken = AuthController.generateAccessToken(user);
            const newRefreshToken = AuthController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly:true,
                secure:false,
                path:'/',
                sameSite:'strict',
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        })
    },

    logOut: async (req, res, next) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
      },
};

// Store Token
// 1. Local Storage: XSS
// 2. HTTPOnly Cookies: CSRF -> SAMESITE
// 3. Redux Store -> AccessToken, HTTPOnly Cookies -> RefreshToken

module.exports = AuthController;
