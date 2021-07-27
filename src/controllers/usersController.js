const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validateUser');

const router = express.Router();

const usersService = require('../services/usersService');

const responseCodes = {
  success: 200,
  created: 201,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

router.post('/admin', validateToken, validateUser, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const reqUser = req.user;
    if (reqUser.role !== 'admin') throw Error({ message: 'Not admin' });
    const user = await usersService.addAdminUser({ name, email, password }, reqUser);
    res.status(responseCodes.created).json({ user });
  } catch (error) {
    res.status(responseCodes.forbidden).json({ message: 'Only admins can register new admins' });
  }
});

router.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.addUser({ name, email, password });
  res.status(responseCodes.created).json({ user });
});
module.exports = router;
