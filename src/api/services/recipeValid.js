const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/userModel');

const secret = 'karla';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await getByEmail(decoded.data.email);

    if (!user) {
      res.status(401).json({ message: 'jwt malformed' });
    }

    req.userId = decoded.data.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateJWT,
};