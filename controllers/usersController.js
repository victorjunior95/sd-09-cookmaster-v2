const express = require('express');
const UsersServices = require('../services/UsersServices');
const response = require('../middlewares/responseCodes');

const UsersRouter = express.Router();

UsersRouter.get('/', async (req, res) => {
  const registeredUsers = await UsersServices.getAllUsers();
  return res.status(response.STATUS_OK).json(registeredUsers);
});

UsersRouter.post('/', async (req, res, _next) => {
  const newUserInfo = req.body;
  const newUser = await UsersServices.createNewUser(newUserInfo);
  if (newUser.errorCode) return res.status(newUser.errorCode).json({ message: newUser.message });
  const { password, ...userInfo } = newUser;
  return res.status(response.STATUS_CREATED).json({ user: userInfo });
});

UsersRouter.post('/login', async (req, res) => {
  const logUser = req.body;
  const loginSuccessful = await UsersServices.logUser(logUser);
  return res.status(response.STATUS_OK).json({ token: loginSuccessful.token });
});

module.exports = UsersRouter;
