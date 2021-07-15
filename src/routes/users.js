const express = require('express');
const { validatesUsers } = require('../middlewares/validades');
const Users = require('../controllers/users');

const UsersRouter = express.Router();

UsersRouter.post('/', validatesUsers, Users.createUser);

module.exports = UsersRouter;