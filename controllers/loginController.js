const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const usersModel = require('../models/usersModel');

const jwtSecret = 'jwtsecret';

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersModel.getUser(email);

  if (!user || user.password !== password) {
    return next({
      status: 401,
      message: 'Incorrect username or password',
    });
  }

  const { _id, role } = user;

  const jwtPayload = { id: _id, email, role };

  const jwtConfig = { algorithm: 'HS256' };

  const token = jwt.sign(jwtPayload, jwtSecret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = {
  login,
};
