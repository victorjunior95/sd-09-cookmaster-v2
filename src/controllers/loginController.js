const express = require('express');
const usersService = require('../services/usersService');

const routerLogin = express.Router();

routerLogin.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
  const dataLogin = await usersService.findUserCreateToken(email, password);
  if (dataLogin.err) {
    return next(dataLogin);
  }
  return res.status(dataLogin.status).json(dataLogin.token);
  } catch (error) {
    return next(error);
  }
});
module.exports = routerLogin;