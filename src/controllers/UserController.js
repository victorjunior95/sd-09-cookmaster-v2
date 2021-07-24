const { Router } = require('express');
const UserService = require('../services/UserService');

const UserRouter = Router();
const AuthRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQ = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;

UserRouter.post('/', async (req, res, next) => {
  try {
    const userData = req.body;
    const resp = await UserService.create(userData);
    res.status(HTTP_CREATED).json({ user: resp });
  } catch (err) {
    if (err.message === 'invalid_data') {
      return next({ httpCode: HTTP_BAD_REQ, message: 'Invalid entries. Try again.' });
    }
    if (err.message === 'invalid_email') {
      return next({ httpCode: HTTP_CONFLICT, message: 'Email already registered' });
    }
    next(err);
  }
});

AuthRouter.post('/', async (req, res, next) => {
  try {
    const loginData = req.body;
    const token = await UserService.auth(loginData);
    res.status(HTTP_OK).json({ token });
  } catch (err) {
    if (err.message === 'invalid_data') {
      return next({ httpCode: HTTP_UNAUTHORIZED, message: 'All fields must be filled' });
    }
    if (err.message === 'invalid_login') {
      return next({ httpCode: HTTP_UNAUTHORIZED, message: 'Incorrect username or password' });
    }
    next(err);
  }
});

module.exports = { UserRouter, AuthRouter };
