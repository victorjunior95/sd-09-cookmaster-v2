const jwt = require('jsonwebtoken');

const unauthorized = 401;
const secret = 'blablabla';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const userData = jwt.verify(token, secret);
  if (!token) {
    return res.status(unauthorized).json({ message: 'jwt malformed' });
  }
  // eu crio uma nova chave no req com o nome 'user' e acrescenta como valor o objeto 'userData':
  req.user = userData;
  next();
};

module.exports = validateToken;
