const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password
  },
});

/**
 * Send verification code to user email
 * @param {string} toEmail
 * @param {string | number} code
 */
const sendVerificationCode = async (toEmail, code) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color:#4F46E5;">${code}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
};

const sendForgotPasswordEmail = async (toEmail, resetLink) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset</h2>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          <a href="${resetLink}" style="background-color:#4F46E5; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Forgot password email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Forgot password email send failed:", error);
    return false;
  }
};

module.exports = { sendVerificationCode, sendForgotPasswordEmail };