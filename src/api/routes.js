const express = require('express');
const validateUser = require('../schemas/validateUser');
const validateLogin = require('../schemas/validateLogin');
const createToken = require('../schemas/createToken');

const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.use('/users', validateUser, usersControllers.createUser);
router.use('/login', validateLogin, createToken, usersControllers.login);

module.exports = router;
