const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/login');
const loginController = require('../controller/loginController');

router.post('/', middlewares.validateFields, 
middlewares.validateEntriesFormat,
loginController.login);

module.exports = router;
