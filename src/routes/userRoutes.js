const express = require('express');
const userController = require('../controllers/userController');
const {
  validName,
  validEmail,
  validPassword,
} = require('../services/userService');

const router = express.Router();

router.post('/users', validName, validEmail, validPassword, userController.createUser);

module.exports = router;