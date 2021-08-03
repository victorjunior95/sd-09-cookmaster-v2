const jwt = require('jsonwebtoken');
const { messages, codes } = require('../schemas/ErrorHandling');

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'mySecretKey';

  if (!token) {
    return res.status(codes.CODE_401).json({ message: messages.INVALID_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { _id } = decoded;
    req.userId = _id;
    next();
  } catch (err) {
    return res.status(codes.CODE_401).json({ message: messages.INVALID_TOKEN });
  }
};

module.exports = { tokenValidator };