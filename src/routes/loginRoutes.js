const express = require('express');
const loginControllers = require('../controllers/loginController');

const userRouters = express.Router();

userRouters.get('/', loginControllers.validateLogin);

module.exports = userRouters;