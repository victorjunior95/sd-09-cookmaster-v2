const service = require('../services/users');

async function newUser(req, res) {
  const { name, email, password } = req.body;
  const { status, result } = await service.newUser(name, email, password);
  return res.status(status).json({ user: result });
}

async function login(req, res) {
  const { email, password } = req.body;
  const { status, token } = await service.login(email, password);
  return res.status(status).json({ token });
}

module.exports = {
  newUser,
  login,
};
