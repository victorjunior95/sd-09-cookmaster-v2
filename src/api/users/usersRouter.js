const express = require('express');
const UsersController = require('./usersController');
const { validateUser } = require('./usersMiddleware');

const usersRouter = express.Router();

usersRouter.post('/', validateUser, UsersController.create);

module.exports = usersRouter;
