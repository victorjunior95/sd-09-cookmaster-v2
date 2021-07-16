const jwt = require('jsonwebtoken');

const secret = 'valhallaawaits';

const validateJWT = (req, res, next) => {
  const { headers: { authorization } } = req;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    if (!payload) {
      return res.status(401).json({ message: 'Failed to find user' });
    }
    req.payload = payload;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
