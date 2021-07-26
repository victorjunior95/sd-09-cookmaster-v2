const express = require('express');

const router = express.Router();

const nameValidation = require('../middleware/nameValidation');
const emailValidation = require('../middleware/emailValidation');
const emailExistingValidation = require('../middleware/emailExistingValidation');
const passwordValidation = require('../middleware/passwordValidation');

const userController = require('../controller/usersController');

router.post('/',
nameValidation,
emailValidation,
emailExistingValidation,
passwordValidation,
userController.registerUser);

module.exports = router;
