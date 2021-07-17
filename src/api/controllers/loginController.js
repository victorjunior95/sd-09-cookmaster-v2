const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const usersService = require('../services/usersService');

const { validateLogin } = require('../schemas/loginSchema');
const StatusCode = require('../schemas/StatusCode.js');

const jwt = require('jsonwebtoken');

const secret = 'something';

const jwtConfig = {
  algorithm: 'HS256',
};

router.post('/', validateLogin, rescue(async(req, res) => {
  const { email, password } = req.body;

  const login = await usersService.loginUser(email, password);
  if (login.err) return res.status(StatusCode.UNAUTHORIZED).json(login.err);

  const token = jwt.sign(login, secret, jwtConfig);
  res.status(StatusCode.OK).json({ token });
}));

module.exports = router;
