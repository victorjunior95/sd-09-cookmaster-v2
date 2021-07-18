const jwt = require('jsonwebtoken');
const userModel = require('../../models/usersModel');

const secret = 'senhamaisseguradomundo';

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const missing = { status: 401, message: 'missing auth token' };
    throw missing;
  }
  try {
    const decoded = jwt.verify(authorization, secret);
    const user = await userModel.findEmail(decoded.user.email);
    if (!user) {
      const notFound = { status: 404, message: 'usuario morreu' };
      throw notFound;
    }
    req.user = user;
    next();
  } catch (err) {
      const error = { status: 401, message: 'jwt malformed' };
      throw error;
  }
};

module.exports = validateToken;