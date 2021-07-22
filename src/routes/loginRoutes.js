const express = require('express');
const loginControllers = require('../controllers/loginController');

const userRouters = express.Router();

userRouters.post('/', loginControllers.validateLogin);

module.exports = userRouters;