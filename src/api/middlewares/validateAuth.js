const jwt = require('jsonwebtoken');

const jwtSecret = 'Cookmaster Secret';

module.exports = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return next({ error: 'missingToken' });

  try {
    const { _id: userId } = jwt.verify(authorization, jwtSecret);
    req.userId = userId;
    next();
  } catch (error) {
    return next({ error: 'invalidToken' });
  }
};
