const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const loginController = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', rescue(loginController.login));

module.exports = loginRouter;