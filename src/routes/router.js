const express = require('express');

const UsersRouter = require('../controllers/UsersController');

const LoginRouter = require('../controllers/LoginController');

const router = express.Router();

router.use('/users', UsersRouter);

router.use('/login', LoginRouter); 

module.exports = router;