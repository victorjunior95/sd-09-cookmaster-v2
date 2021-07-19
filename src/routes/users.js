const express = require('express');

const router = express.Router();
const {
  validate,
  validateUserEmail,
  validateEmailFormat,
} = require('../middlewares/users');

const UserController = require('../controller/usersController');

router.post('/',
  validate,
  validateUserEmail,
  validateEmailFormat,
  UserController.createUser);

module.exports = router;
