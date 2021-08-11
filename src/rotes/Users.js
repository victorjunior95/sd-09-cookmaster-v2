const express = require('express');
const UserController = require('../controllers/Users');
const Auth = require('../auth/tokenValidator');

const Router = express.Router();

Router.post('/', UserController.createUser);
Router.post('/admin', Auth.tokenValidator, UserController.createUserAdmin);

module.exports = Router;