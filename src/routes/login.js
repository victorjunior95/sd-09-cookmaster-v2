const express = require('express');
const rescue = require('express-rescue');

const loginController = require('../controller/login');

const router = express.Router();

router.post(
  '/',
  rescue(loginController.validateLogin),
);

module.exports = router;
