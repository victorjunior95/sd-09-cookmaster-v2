const rescue = require('express-rescue');

const Service = require('../services/UserService');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  const user = await Service.createUser({ name, email, password, role });

  // console.log(user);

  if (user.error) {
    return next(user.error);
  }

  return res.status(201).json(user);
});

module.exports = {
  createUser,
};