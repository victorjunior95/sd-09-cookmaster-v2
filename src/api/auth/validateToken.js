const jwt = require('jsonwebtoken');
const KEY = require('../../utils/secret');

const usersModel = require('../../models/Users');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(authorization, KEY);

    const getAllUsers = await usersModel.getAll();

    const result = getAllUsers.find((user) => user.name === decoded.data.name);

    if (!result) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    req.user = result;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};
