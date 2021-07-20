const UsersModel = require('../models/userModel');
// const UsersSchema = require('../schema/users');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INVALID_ENTRIES = 'Invalid entries. Try again.';

const validate = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  next();
};

const validateUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const users = await UsersModel.getUserByEmail(email);
  if (users) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;
  const emailVerify = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  if (!emailVerify) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  validate,
  validateUserEmail,
  validateEmailFormat,
};