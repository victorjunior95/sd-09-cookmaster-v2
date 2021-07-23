const express = require('express');
const userController = require('../controllers/userController');

const loginRoute = express.Router();

// efetua login
loginRoute.post('/', userController.enterUseLogin);

module.exports = loginRoute;