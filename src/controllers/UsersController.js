const express = require('express');
const rescue = require('express-rescue');

const UsersService = require('../services/UsersService');

const UsersRouter = express.Router();

const USER_REGISTERED = 201;

UsersRouter.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;
    const newUser = await UsersService.createUser({ name, email, password, role: 'user' });
    return res.status(USER_REGISTERED).json(newUser);
}));

module.exports = UsersRouter;