const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/login');
const loginController = require('../controller/loginController');

router.post('/', middlewares.validate, 
middlewares.validateEmailAndPassword,
loginController);

module.exports = router;
