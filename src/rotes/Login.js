const express = require('express');
const LoginController = require('../controllers/Login');

const Router = express.Router();

Router.post('/', LoginController.Login);

module.exports = Router;