const express = require('express');

const usersRouter = express.Router();

const {
  registerUserController,
  loginController,
} = require('../controllers/usersController');

usersRouter.post('/users', registerUserController);
usersRouter.post('/login', loginController);

module.exports = usersRouter;
