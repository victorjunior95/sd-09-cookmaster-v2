const rescue = require('express-rescue');
const { loginService } = require('../services/loginServices');

const login = rescue(async (req, res, _next) => {
  const loginData = req.body;
  const response = await loginService(loginData);
  if (response.error) return res.status(response.status).json({ message: response.error });
  return res.status(200).json({ token: response });
});

module.exports = {
  login,
};