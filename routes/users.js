const express = require('express');
const { loginValidation } = require('../joiSchema/schemaLogin');
const { registerValidation } = require('../joiSchema/schemaRegister');
const { schemaValidator } = require('../middlewares/schemaValidator');
const { generateToken } = require('../utils/authHelpers');
const {
  findEmail, generateUser, validPassword, getUsers, getUser, deleteUser, updateUser,
} = require('../db/users');

const router = express.Router({ mergeParams: true });

router
  .get('/', async (req, res) => {
    const users = await getUsers();
    if (users) {
      return res.status(200).json({
        success: true,
        message: 'Users in database',
        body: users,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Database empty of users',
    });
  })

  .post('/register', (req, res, next) => {
    schemaValidator(registerValidation, req, res, next);
  }, async (req, res) => {
    const {
      name, lastname, dni, age, email, password,
    } = req.body;
    // Check if email is already'v in database
    const checkEmail = await findEmail(email);
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: `Email (${email}) already exists`,
      });
    }
    // Try generate user
    const user = await generateUser(name, lastname, dni, age, email, password);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Error to generate user',
        body: { user },
      });
    }
    try {
      const savedUser = await user.save();
      return res.status(200).json({
        success: true,
        message: 'User generated',
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

  .post('/login', (req, res, next) => {
    schemaValidator(loginValidation, req, res, next);
  }, async (req, res) => {
    const { body } = req;
    // Check if email exist
    const user = await findEmail(body.email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email is wrong',
        body: {},
      });
    }
    // Check if password is correct
    const checkPassword = await validPassword(body.password, body.email);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password is wrong',
        body: {},
      });
    }
    // Generate and return token
    const token = await generateToken(user);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is invalid',
        body: {},
      });
    }
    // Add token to response
    res.setHeader('token', token);
    return res.status(200).json({
      success: true,
      message: 'Token generated',
      body: token,
    });
  })

  .put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const toUpdate = req.body;

    const updated = await updateUser(userId, toUpdate);
    if (updated > 0) {
      const user = await getUser(userId);
      return res.status(200).json({
        success: true,
        message: 'User update',
        body: user,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'User not find',
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
      message: 'User not found',
    });
  });

module.exports = router;
