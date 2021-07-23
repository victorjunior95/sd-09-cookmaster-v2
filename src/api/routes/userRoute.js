const express = require('express');
const validateJwt = require('../controllers/validateJwt');
const userController = require('../controllers/userController');

const userRoute = express.Router();

// cria novo usuario
userRoute.post('/', userController.createNewUser);

// cria usuario admin
userRoute.post('/admin', validateJwt, userController.createNewAdmin);

module.exports = userRoute;