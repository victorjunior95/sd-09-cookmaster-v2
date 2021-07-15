const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const validateLogin = async (email, password) => {
  const getUser = await usersModel.getUserByEmailFromDb(email);

  if (!getUser || password !== getUser.password) return false;

  const { _id: id, email: userEmail, role } = getUser;

  return {
    id,
    userEmail,
    role,
  };
};

const generateToken = (user) => {
  const token = jwt.sign(user, 'secret');

  return token;
};

module.exports = {
  validateLogin,
  generateToken,
};
