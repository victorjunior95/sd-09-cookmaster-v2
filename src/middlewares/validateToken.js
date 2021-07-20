const jwt = require('jsonwebtoken');

const SECRET = 'mysupersecret';

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    return { code: 401, message: 'jwt malformed' };
  }
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ code: 401, message: 'missing auth token' });
  }

  const tokenVerify = verifyToken(token);
    if (tokenVerify.message) {
      return res.status(tokenVerify.code).json({ message: tokenVerify.message });
    }
  const { _id, email, name, role } = tokenVerify;
  req.user = {
    id: _id,
    email,
    name,
    role,
  };

  return next();
};

module.exports = validateToken;