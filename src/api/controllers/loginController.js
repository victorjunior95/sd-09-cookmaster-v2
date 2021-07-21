const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, token } = await loginService.login(email, password);
  res.status(status).json({ token });
};

module.exports = {
  login,
};
