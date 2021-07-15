const express = require('express');
const UsersServices = require('../services/UsersServices');
const response = require('../middlewares/responseCodes');

const LoginRouter = express.Router();

LoginRouter.post('/', async (req, res) => {
  const logUser = req.body;
  const loginSuccessful = await UsersServices.logUser(logUser);
  if (loginSuccessful.errorCode) {
    console.log(loginSuccessful);
    return res.status(loginSuccessful.errorCode).json({ message: loginSuccessful.message });
  }
  return res.status(response.STATUS_OK).json({ token: loginSuccessful });
});

module.exports = LoginRouter;
