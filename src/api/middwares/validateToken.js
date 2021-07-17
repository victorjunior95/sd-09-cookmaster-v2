const jwt = require('jsonwebtoken');
const { messageError } = require('./errors');
const { JWT_MALFORMED } = require('./errorMessages');
const { UNAUTHORIZED_STATUS } = require('./httpStatus');

const SECRET = require('./secret');

const validateToken = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, SECRET);

    req.user = payload;
    next();
  } catch (err) {
    next(messageError(UNAUTHORIZED_STATUS, JWT_MALFORMED));
  }
};

module.exports = { validateToken };