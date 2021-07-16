const jwt = require('jsonwebtoken');

const SECRET = 'segredo_mais_secreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    const { _id } = decoded.data;

    req.userId = _id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
