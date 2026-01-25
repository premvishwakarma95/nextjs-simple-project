const express = require('express');
const { register, verifyUser, login, forgotPassword } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyUser);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);

module.exports = authRouter;