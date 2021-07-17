const express = require('express');

const router = express.Router();

const validateMiddlewares = require('../middlewares/users');

const userController = require('../controller/usersController');

router.post(
  '/',
  validateMiddlewares.validate,
  validateMiddlewares.validateEmailEqual,
  validateMiddlewares.validateEmail,
  userController.creteUSers,
);

module.exports = router;