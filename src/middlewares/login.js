const UsersModel = require('../models/userModel');

const UNAUTHORIZED = 401;

const validateFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateEntriesFormat = async (req, res, next) => {
  const { email, password } = req.body;
  const getUser = await UsersModel.getUserByEmail(email);
  if (!getUser) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  if (getUser.password !== password) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  validateFields,
  validateEntriesFormat,
};