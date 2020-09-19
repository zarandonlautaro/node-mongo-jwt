const express = require('express');
const { loginValidation } = require('../joiSchema/schemaLogin');
const { registerValidation } = require('../joiSchema/schemaRegister');
const { schemaValidator } = require('../middlewares/schemaValidator');
const { generateToken } = require('../utils/authHelpers');
const {
  findEmail, findPassword, generateUser, validPassword,
} = require('../db/users');

const router = express.Router({ mergeParams: true });

router
  .post('/register', (req, res, next) => {
    schemaValidator(registerValidation, req, next);
  }, async (req, res) => {
    const { name, email, password } = req.body;
    // Check if email is already'v in database
    const checkEmail = await findEmail(email);
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: `Email (${email}) already exists`,
        body: {},
      });
    }
    // Try generate user
    const user = await generateUser(name, email, password);
    try {
      const savedUser = await user.save();
      return res.status(200).json({
        success: true,
        message: 'User was generated',
        body: { user: savedUser },
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Error to generate user',
        body: { err },
      });
    }
  })

  // Login
  .post('/login', (req, res, next) => {
    schemaValidator(loginValidation, req, next);
  }, async (req, res) => {
    const { body } = req;
    // Check if email exist
    const user = await findEmail(body.email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'The email is wrong',
        body: {},
      });
    }
    // Check if password is correct
    const checkPassword = await validPassword(body.password, body.email);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: 'The password is wrong',
        body: {},
      });
    }
    // Generate and return token
    const token = await generateToken(user);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'The token is incorrect',
        body: {},
      });
    }
    // Add token to response
    res.setHeader('token', token);
    return res.status(200).json({
      success: true,
      message: 'jwt generated',
      body: token,
    });
  })

  .delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await getUser(userId);
    const deleted = await deleteUser(userId);
    if (deleted > 0) {
      return res.status(200).json({
        success: true,
        message: 'User deleted',
        body: user,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  });

module.exports = router;
