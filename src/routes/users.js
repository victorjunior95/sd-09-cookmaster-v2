const express = require('express');

const tokenValidaton = require('../middlewares/tokenValidation');

const userController = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.post('/', userController.createUser);
usersRouter.post('/admin', tokenValidaton, userController.createAdmin);

module.exports = usersRouter;
