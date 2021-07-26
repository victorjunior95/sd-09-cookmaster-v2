const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const secret = 'sd-09-cookmaster-v2';

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

module.exports = async (authorization) => {
  if (!authorization) {
    throw validateError(401, 'missing auth token');
  }

  try {
    const decoded = jwt.verify(authorization, secret);

    const user = await Users.findByEmail(decoded.payload.email);

    if (!user) {
      throw validateError(401, 'jwt malformed');
    }

    return decoded.payload;
  } catch (error) {
    throw validateError(401, 'jwt malformed');
  }
};
