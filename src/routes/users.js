const express = require('express');

const router = express.Router();

const nameValidation = require('../middleware/nameValidation');
const emailValidation = require('../middleware/emailValidation');
const emailExistingValidation = require('../middleware/emailExistingValidation');
const passwordValidation = require('../middleware/passwordValidation');
const validateToken = require('../middleware/validateToken');
const isAdminValidation = require('../middleware/isAdminValidation');

const userController = require('../controller/usersController');

router.post('/',
  nameValidation,
  emailValidation,
  emailExistingValidation,
  passwordValidation,
  userController.registerUser);

router.post('/admin',
  validateToken,
  isAdminValidation,
  userController.registerAdmin);

module.exports = router;
