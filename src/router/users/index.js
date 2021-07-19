const express = require('express');
const { createUser } = require('../../controllers/users');

const userRoute = express.Router();

userRoute.post('/', createUser);

module.exports = userRoute;