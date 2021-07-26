const jwt = require('jsonwebtoken');
const { findEmail } = require('../models');
const secret = require('../secret');
const { INVALID_TOKEN } = require('../Messages/errors');

const validateToken = async (token) => {
  const decoded = await jwt.verify(token, secret);
  const user = await findEmail(decoded.data.email);
  if (!user) return INVALID_TOKEN;

  return user;
};

module.exports = validateToken;
