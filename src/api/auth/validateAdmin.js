const jwt = require('jsonwebtoken');
const KEY = require('../../utils/secret');

const FORBIDDEN = 403;

module.exports = async (req, res, next) => {
  // const admin = async ({ authorization }) => {
  //   const secret = '60f25632bbd8eb246fbe3170';
  //   const { role } = jwt.verify(authorization, secret);
  //   if (role !== 'admin') {
  //     const err = { message: 'Only admins can register new admins' };
  //     throw err;
  //   }
  // };

  try {
    const { authorization } = req.headers;
    const { role } = jwt.verify(authorization, KEY);

    if (role === 'admin') next();
  } catch (error) {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }
};
