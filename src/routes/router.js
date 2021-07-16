const express = require('express');
const UserController = require('../controller/userController');
const LoginController = require('../controller/loginController');

const router = express.Router();

router.use('/users', UserController);

router.use('/login', LoginController);

module.exports = router;