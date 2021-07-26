const jwt = require('jsonwebtoken');
const { findEmail } = require('../models');
const secret = require('../secret');
const { INVALID_TOKEN } = require('../Messages/errors');

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    const user = await findEmail(decoded.data.email);
    if (!user) return INVALID_TOKEN;
    return user;
  } catch (e) {
    return INVALID_TOKEN;
  }
};

module.exports = validateToken;
