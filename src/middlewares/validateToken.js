const jwt = require('jsonwebtoken');

const jwtSecret = 'jwtsecret';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({
      status: 401,
      message: 'missing auth token',
    });
  }

  try {
    const decode = jwt.verify(token, jwtSecret);

    req.userId = decode.id;
    req.userRole = decode.role;

    next();
  } catch (error) {
    return next({
      status: 401,
      message: error.message,
    });
  }
};
