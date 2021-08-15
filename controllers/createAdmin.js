const rescue = require('express-rescue');

const Services = require('../services/user');

const CREATED = 201;

module.exports = rescue(async (req, res) => {
  // console.log('CONTROLLER createAdmin req.body', req.body);
  const { name, email, password } = req.body;
  const token = req.headers.authorization;
  const user = await Services.createAdmin(token, name, email, password);
  // console.log('CONTROLLER createAdmin user', user);
  if (!user) throw Error;
  res.status(CREATED).json({ user });
});
