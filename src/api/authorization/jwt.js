const jwt = require('jsonwebtoken');
const userModel = require('../../models/usersModel');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.length !== 277) {
    const error = { status: 401, message: 'jwt malformed' };
    throw error;
  }
  const secret = 'senhamaisseguradomundo';
  const decoded = jwt.verify(authorization, secret);
  const user = await userModel.findEmail(decoded.user.email);
  if (!user) {
    const notFound = { status: 404, message: 'usuario morreu' };
    throw notFound;
  }
  req.user = user;
  next();
};

module.exports = validateToken;