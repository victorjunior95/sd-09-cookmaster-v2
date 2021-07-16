const express = require('express');
const rescue = require('express-rescue');

const LoginService = require('../services/LoginService');

const LoginRouter = express.Router();

LoginRouter.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await LoginService.login(email, password);
  return res.status(200).json(token);
}));

module.exports = LoginRouter;