const rescue = require('express-rescue');
const { find } = require('../services/users');

const ok = 200;

const login = rescue(async (req, res) => {
  const { email = '', password = '' } = req.body;
  const user = await find(email, password);
  res.status(ok).json(user);
});

module.exports = { login };