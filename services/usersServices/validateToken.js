const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../../models/users');

const unauthorized = 401;
const secret = 'blablabla';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(unauthorized).json({ message: 'missing auth token' });
  }
  try {
    const userData = jwt.verify(token, secret);
    const userByEmail = await getUserByEmail(userData.email);
    const { password, ...noPassword } = userByEmail;
    req.user = noPassword;
    return next();
  } catch (error) {
    return res.status(unauthorized).json({ message: error.message });
  }
};

module.exports = validateToken;
