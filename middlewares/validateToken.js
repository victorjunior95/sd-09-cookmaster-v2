const jwt = require('jsonwebtoken');

const jwtSecret = 'jwtsecret';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  try {
    const decode = jwt.verify(token, jwtSecret);
    
    req.userId = decode.id;

    next();
  } catch (error) {
    return next({
      status: 401,
      message: error.message,
    });
  }
};
