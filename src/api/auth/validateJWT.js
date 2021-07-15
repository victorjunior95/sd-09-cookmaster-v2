const jwt = require('jsonwebtoken');
const usersModel = require('../../models/usersModel');

const secret = 'meusegredosuperforte';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ status: 401, message: 'jwt malformed' });

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findById(decoded.id);

    if (!user) return next({ status: 401, message: 'erro email' });

    const { _id: id } = user;

    req.body.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};