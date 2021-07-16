const loginService = require('../services/loginService');

const login = async (req, res) => {
  const success = await loginService.login(req.body);
  return res.status(200).json(success);
};

module.exports = {
  login,
};
