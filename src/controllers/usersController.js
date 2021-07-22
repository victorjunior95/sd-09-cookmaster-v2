const express = require('express');
const { validateUser } = require('../middlewares/validateUser');

const router = express.Router();

const usersService = require('../services/usersService');

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

router.get('/', async (_req, res) => {
  const usersList = await usersService.getAllUsers();
  res.status(responseCodes.success).json({ users: usersList });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await usersService.findUserById(id);
  res.status(responseCodes.success).json(user);
});

router.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.addUser({ name, email, password });
  res.status(responseCodes.created).json(user);
});
module.exports = router;
