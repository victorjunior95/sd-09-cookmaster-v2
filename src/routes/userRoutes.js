const { Router } = require('express');
const userController = require('../controller/userController');

const userRoute = Router();

userRoute
  .post('/', userController.createUser);

module.exports = userRoute;