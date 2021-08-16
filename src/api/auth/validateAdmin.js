// const jwt = require('jsonwebtoken');
// const KEY = require('../../utils/secret');

const FORBIDDEN = 403;

module.exports = async (req, res, next) => {
  const { role } = req.user;
  console.log(req.user);

  if (role === 'admin') return next();
  return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
};
