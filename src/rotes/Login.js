const express = require('express');
const LoginController = require('../controllers/Login');

const Router = express.Router();

Router.post('/login', LoginController.Login);

module.exports = Router;