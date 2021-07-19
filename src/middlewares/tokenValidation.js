const jwt = require('jsonwebtoken');

const verifyToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({
      message: 'missing auth token',
      statusCode: 401,
    });
  }

  try {
    const payload = jwt.verify(token, 'secret');

    req.userId = payload.id;
    req.userRole = payload.role;

    next();
  } catch (err) {
    // console.log(err);
    return next({ message: err.message, statusCode: 401 });
  }
};

module.exports = verifyToken;
