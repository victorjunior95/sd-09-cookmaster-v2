const service = require('../services/users');

async function newUser(req, res) {
  const { name, email, password } = req.body;
  if (req.route.path === '/users/admin') {
    const { role } = req.user;
    if (role !== 'admin') {
      const error = new Error();
      error.code = 'forbidden';
      throw error;
    }
    const result = await service.newUser(name, email, password, 'admin');
    return res.status(201).json({ user: result });
  }
  const result = await service.newUser(name, email, password, 'user');
  return res.status(201).json({ user: result });
}

async function login(req, res) {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  return res.status(200).json({ token });
}

module.exports = {
  newUser,
  login,
};
