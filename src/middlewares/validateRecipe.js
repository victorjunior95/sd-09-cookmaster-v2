const jwt = require('jsonwebtoken');

const { findUserByEmail } = require('../models/userModel');

const error = {
  invalid: 'Invalid entries. Try again.',
  invalidToken: 'jwt malformed',
};

const status = {
  badRequest: 400,
  unauthorized: 401,
};

const validateRecipes = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { isError: true,
      message: error.invalid,
      status: status.badRequest,
    };
  }
  return true;
};

const validateJWT = async (token) => {
  const secret = 'tokensecret';
  const decoded = jwt.verify(token, secret);
  const userData = await findUserByEmail(decoded.data.email);

  if (!userData) {
    return { isError: true,
      message: error.invalidToken,
      status: status.unauthorized,
    };
  }
  return true;
};

module.exports = {
  validateRecipes,
  validateJWT,
};