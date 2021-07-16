const express = require('express');
const postUsersMidd = require('../middlewares/postUsersMidd');
const getUsersMidd = require('../middlewares/getUsersMidd');
const getByEmailMidd = require('../middlewares/getByEmailMidd');

const userRouters = express.Router();

userRouters.post('/', postUsersMidd);

userRouters.get('/', getUsersMidd);

userRouters.get('/:email', getByEmailMidd);

module.exports = userRouters;
