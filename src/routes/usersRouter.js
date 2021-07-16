const express = require('express');

const usersRouter = express.Router();

const {
  registerUserController,
  loginController,
  registerAdminController,
} = require('../controllers/usersController');
const validateJWT = require('../middlewares/validateJWT');

usersRouter.post('/users', registerUserController);
usersRouter.post('/login', loginController);
usersRouter.post('/users/admin', [
  validateJWT,
  registerAdminController,
]);

module.exports = usersRouter;
