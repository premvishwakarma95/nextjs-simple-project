const express = require('express');
const {register, verifyUser, login} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyUser);
authRouter.post('/login', login);

module.exports = authRouter;