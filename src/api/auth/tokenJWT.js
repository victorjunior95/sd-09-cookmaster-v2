const jwt = require('jsonwebtoken');
const usersModel = require('../../models/usersModel');

const secret = 'meusegredosuperforte';

module.exports = async (req, res, next) => {
  const token = req.headers.autorization;

  if (!token) return next({ status: 401, message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findByEmail(decoded.email);

    if (!user) return next({ status: 401, message: 'erro' });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};