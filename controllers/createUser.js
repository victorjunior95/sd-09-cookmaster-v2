const rescue = require('express-rescue');

const Services = require('../services/user');

const OK = 201;

const createUser = rescue(async (req, res) => {
  // console.log('CONTROLLER req.body', req.body);
  const { name, email, password } = req.body;
  const user = await Services.createUser(name, email, password);
  if (!user) throw Error;
  delete user.password;
  res.status(OK).json({ user });
});

module.exports = createUser;
