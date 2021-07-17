const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const usersService = require('../services/usersService');

const { validateUser } = require('../schemas/usersSchema');
const StatusCode = require('../schemas/StatusCode.js');

router.get('/', rescue(async (_req, res) => {
  const users  = await usersService.getAllUsers();

  if(!users) return res.status(error.NOT_FOUND).send({ message: 'Not found' });

  return res.status(StatusCode.OK).send(users);
}));

router.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const createUser  = await usersService.createNewUser(name, email, password);

  if(createUser.err) return res.status(StatusCode.CONFLICT).json(createUser.err);

  return res.status(StatusCode.CREATED).json(createUser);
}));

module.exports = router;
