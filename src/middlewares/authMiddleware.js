const { verifyToken } = require('../auxiliarFunctions/jwtFunctions');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.status = 401;
    return next(err);
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    err.status = 401;
    err.message = 'jwt malformed';
    next(err);
  }
};

module.exports = auth;
