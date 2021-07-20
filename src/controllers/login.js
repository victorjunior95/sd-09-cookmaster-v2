const rescue = require('express-rescue');
const Login = require('../services/login');

const createLogin = rescue(async (req, res, _next) => {
  const user = await Login.createLogin(req.body);
  return res.status(200).json(user);
});

module.exports = {
  createLogin,
};