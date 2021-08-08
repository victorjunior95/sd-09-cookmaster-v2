const jwt = require('jsonwebtoken');

const HTTP_UNAUTHORIZED_STATUS = 401;

const auth = (req, _res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, 'segredo');

    req.user = decoded;

    return next();
  } catch (err) {
    err.statusCode = HTTP_UNAUTHORIZED_STATUS;

    return next(err);
  }
};

module.exports = auth;
