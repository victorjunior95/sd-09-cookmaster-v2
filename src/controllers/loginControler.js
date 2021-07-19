const express = require('express');
const validateCredentials = require('../middlewares/validateLogin');

const userRouters = express.Router();

userRouters.get('/', validateCredentials);

module.exports = userRouters;