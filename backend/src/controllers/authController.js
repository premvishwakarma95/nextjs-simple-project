const users = require('../models/authMode');
const bcrypt = require('bcrypt');
const { sendVerificationCode, sendForgotPasswordEmail } = require('../config/email')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        if (!name || !email || !number || !password) {
            return res.statu(404).json({ success: false, message: 'all field not found' });
        }

        const isUserExist = await users.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ success: false, message: 'User already exist with this email' });
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const code = Math.floor(Math.random() * 10000);

        const response = await users.create({ name, email, number, password: hashPassword, code });

        if (response) {
            sendVerificationCode(email, code)
        }

        return res.status(200).json({ success: true, message: 'you registered successfully now please check your mail' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

const verifyUser = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!code || !email) {
            return res.status(400).json({ success: false, message: "please provide verification code and email" });
        }

        const user = await users.findOneAndUpdate({ email, code, isVerified: false }, { isVerified: true, code: null });

        if (user) {
            return res.status(200).json({ success: true, message: 'email verified successfully' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'please provide email and password' });
        }

        const isEmailExist = await users.findOne({ email });

        if (!isEmailExist) {
            return res.status(400).json({ success: false, message: 'user not found with this email, please register first' });
        }

        if (!isEmailExist?.isVerified) {
            sendVerificationCode(email, isEmailExist.code);
            return res.status(400).json({ success: false, message: 'please verify your email first, please check you email' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, isEmailExist.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'please provide correct email and password' });
        }

        const token = jwt.sign({ id: isEmailExist._id, name: isEmailExist.name, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ success: true, message: 'logged in successfully', token, userId: isEmailExist._id });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'please provide email' });
        }
        const isEmailExist = await users.findOne({ email, isVerified: true });

        if (!isEmailExist) {
            return res.status(400).json({ success: false, message: 'user not found with this email' });
        }
        // further implementation pending
        const resetToken = jwt.sign({ id: isEmailExist._id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        sendForgotPasswordEmail(email, resetLink);
        return res.status(200).json({ success: true, message: 'we have sent email to you please check your inbox' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

module.exports = { register, verifyUser, login, forgotPassword }