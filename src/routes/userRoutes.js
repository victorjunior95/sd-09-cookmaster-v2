const { Router } = require('express');
const auth = require('../middlewares/tokenValidation');
const userController = require('../controller/userController');

const userRoute = Router();

userRoute
  .post('/', userController.createUser);

userRoute
  .post('/admin', auth.tokenValidation, auth.admin, userController.createAdmin); 

module.exports = userRoute;