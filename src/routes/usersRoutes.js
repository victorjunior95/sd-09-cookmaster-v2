const express = require('express');
const userControllers = require('../controllers/usersController');

const userRouters = express.Router();

userRouters.post('/', userControllers.addUser);

userRouters.get('/', userControllers.listAllUsers);

userRouters.get('/:email', userControllers.listOneUser);

module.exports = userRouters;
