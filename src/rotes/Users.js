const express = require('express');
const UserController = require('../controllers/Users');

const Router = express.Router();

Router.post('/', UserController.createUser);

module.exports = Router;