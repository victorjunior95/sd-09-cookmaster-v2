const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../services/RecipeService');

const SECRET = 'meutokensupersecreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'jwt malformed' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await findUserByEmail(decoded.email);

    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateJWT,
};