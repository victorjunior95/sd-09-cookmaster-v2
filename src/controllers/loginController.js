const login = require('../services/loginService');

const create = async (req, res) => {
  const { email, password } = req.body;
  const result = await login.create({ email, password });
  return res.status(200).json(result);
};

module.exports = {
  create,
};
