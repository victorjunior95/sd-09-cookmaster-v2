const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

// cria novo usuario
userRoute.post('/', userController.createNewUser);

module.exports = userRoute;