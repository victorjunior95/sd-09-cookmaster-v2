const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/validateToken');
const usersController = require('../controllers/usersController');

const usersRoute = express.Router();

usersRoute.post('/', rescue(usersController.createUser));
usersRoute.post('/admin', rescue(validateToken), rescue(usersController.createAdmin));

module.exports = usersRoute;
