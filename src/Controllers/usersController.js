const rescue = require('express-rescue');
const Users = require('../Services/usersService');

const userCreate = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await Users.userCreate(email, name, password);

  return res.status(201).json(user);
});

module.exports = {
  userCreate,
};