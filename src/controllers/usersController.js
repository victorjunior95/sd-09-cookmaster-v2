const usersServices = require('../services/usersServices');

async function addUser(req, res) {
  const { name, email, password } = req.body;
  const { status, response } = await usersServices.addUser(name, email, password);
  return res.status(status).json(response);
}

module.exports = {
  addUser,
};
