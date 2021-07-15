const jwt = require('jsonwebtoken');

const verifyToken = (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, 'secret');

    req.userId = payload.id;

    next();
  } catch (err) {
    // console.log(err);
    return next({ message: err.message, statusCode: 401 });
  }
};

module.exports = verifyToken;
