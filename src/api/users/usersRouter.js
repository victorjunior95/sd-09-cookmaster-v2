const express = require('express');
const UsersController = require('./usersController');
const { validateUser, validateLogin } = require('./usersMiddleware');

const usersRouter = express.Router();

usersRouter.post('/users', validateUser, UsersController.create);
usersRouter.post('/login', validateLogin, UsersController.login);

module.exports = usersRouter;
