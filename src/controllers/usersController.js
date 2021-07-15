const express = require('express');

const route = express.Router();
const usersService = require('../services/usersService');

route.post('/', async (req, res, next) => {
  try {
    req.body.role = 'user';
    const response = await usersService.addUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
