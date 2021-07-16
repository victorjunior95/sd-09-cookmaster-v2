const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');
const recipesService = require('../services/recipesService');

const notFoundStatus = 400;
const notAuthorizatedStatus = 403;
const duplicatedStatus = 409;
const sucessStatus = 201;

router.post('/admin', async (req, res) => {
  const { body } = req;

  const token = req.headers.authorization;
  if (!token) {
    return res.status(invalidTokenStatus).send({ message: 'missing auth token' });
  }

  const authorizatedToken = await recipesService.authToken(token);
  if (authorizatedToken.data.role !== 'admin') {
    return res.status(notAuthorizatedStatus)
      .send({ message: 'Only admins can register new admins' });
  }

  const newUser = await usersService.createAdmin(body);

  res.status(sucessStatus).send(newUser);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newUser = await usersService.validateUser(body);

  if (newUser.isJoi) {
    return res.status(notFoundStatus).send({
      message: 'Invalid entries. Try again.'
    });
  } else if (newUser.message) {
    return res.status(duplicatedStatus).send(newUser);
  }

  const { name, email, role, _id } = newUser;

  const newUserToResponse = {
    user: {
      name,
      email,
      role,
      _id,
    }
  };
  res.status(sucessStatus).json(newUserToResponse);
});

module.exports = router;
