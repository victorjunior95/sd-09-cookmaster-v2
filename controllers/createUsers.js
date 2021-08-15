const rescue = require('express-rescue');

const Services = require('../services/user');

const CREATED = 201;

const createUsers = rescue(async (req, res) => {
  // console.log('CONTROLLER req.body', req.body);
  const { name, email, password } = req.body;
  const user = await Services.createUser(name, email, password);
  if (!user) throw Error;
  delete user.password;
  res.status(CREATED).json({ user });
});

module.exports = createUsers;
