const express = require('express');

const route = express.Router();
const usersService = require('../services/usersService');

route.post('/users', async (req, res, next) => {
  try {
    const response = await usersService.addUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

route.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await usersService.login(email, password);
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
