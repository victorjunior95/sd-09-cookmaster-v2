const jwt = require('jsonwebtoken');

const SECRET = 'xinforinfola'; // SECRETE aqui apenas para fins didaticos

const userModel = require('../models/userModel');

const verifyUserExistence = (user) => {
  if (!user) {
    const objectError = {
      code: 401,
      message: 'jwt malformed',
    };
    throw objectError;
  }
};

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const objectError = {
      code: 401,
      message: 'jwt malformed',
    };
    throw objectError;
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findUserById(payload.id);
    verifyUserExistence(user);
    return next();
  } catch (error) {
    const err = { code: 401, message: error.message };
    return next(err);
  }
};

module.exports = tokenValidation;
