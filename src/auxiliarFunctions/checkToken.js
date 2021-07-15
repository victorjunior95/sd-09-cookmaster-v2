const jwt = require('jsonwebtoken');
const secretKey = require('./secretKey');

const checkToken = (token) => {
  try {
    const userData = jwt.verify(token, secretKey);

    return userData;
  } catch (error) {
    return { error: {} };
  }
};

module.exports = checkToken;