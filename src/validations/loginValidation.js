const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const validateLogin = async (email, password) => {
  const getUser = await usersModel.getUserByEmailFromDb(email);

  if (!getUser || password !== getUser.password) return false;

  return {
    id: getUser._id,
    email: getUser.email,
    role: getUser.role,
  };
};

const generateToken = async (user) => {
  const token = jwt.sign(user, 'secret');

  return token;
};

module.exports = {
  validateLogin,
  generateToken,
};
