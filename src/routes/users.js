const express = require('express');
const { validadesUsers } = require('../middlewares/validades');
const Users = require('../controllers/users');

const UsersRouter = express.Router();

UsersRouter.post('/', validadesUsers, Users.createUser);

module.exports = UsersRouter;