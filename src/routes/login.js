const express = require('express');

const router = express.Router();

const loginValidation = require('../middleware/loginValidation');
const loginController = require('../controller/loginController');

router.post('/', 
  loginValidation,
  loginController,
  () => console.log('Logou'));

module.exports = router;
