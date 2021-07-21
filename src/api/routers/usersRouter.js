const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', rescue(usersController.registerUser));

module.exports = usersRouter;
