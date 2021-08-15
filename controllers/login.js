const rescue = require('express-rescue');

const Services = require('../services/user');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  // console.log('CONTROLLER req.body', req.body);
  const { email, password } = req.body;
  const token = await Services.login(email, password);
  if (!token) throw Error;
  res.status(SUCCEEDED).json({ token });
});
