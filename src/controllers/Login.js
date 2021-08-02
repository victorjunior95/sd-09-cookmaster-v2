const rescue = require('express-rescue');
const LoginService = require('../services/Login');

const Login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const { result, code } = await LoginService.login(email, password);
  res.status(code).json(result);
});

module.exports = { Login };