const express = require('express');
const users = require('../controllers/users');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.login, users.login);

module.exports = route;
