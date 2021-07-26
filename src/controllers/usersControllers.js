// requisito 1
const express = require('express');
const usersServices = require('../services/usersServices');

const validateUser = require('../middlewares/usersValidation');
const { status } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const registerUser = await usersServices.postUser(name, email, password);
  return res.status(status.created).json({ user: 
    {
      name: registerUser.name,
      email: registerUser.email,
      role: registerUser.role,
      _id: registerUser.id,
    },
  });
});

module.exports = routes;
