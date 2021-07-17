const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const SECRET = 'mysohiddensecret';

const tokenValidate = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) return next({ err: { code: 'unauthorized', message: 'jwt malformed' } });
  try {
    const decode = await jwt.verify(token, SECRET);
    const user = await Users.findByEmail(decode.data.email);
    request.user = user;
  } catch (err) {
    return { err: { code: 'unauthorized', message: err.message } };
  }
};

module.exports = tokenValidate;
