const express = require('express');
const rescue = require('express-rescue');

const userServices = require('../services/userServices');
const { created } = require('../utils/httpStatusCodes');

const userController = express.Router();

userController.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await userServices.create(name, email, password);

  return res.status(created).json({ user: newUser });
}));

module.exports = userController;
