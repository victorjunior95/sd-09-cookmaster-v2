const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');

const usersRoute = express.Router();

usersRoute.post('/', rescue(usersController.createUser));

module.exports = usersRoute;
