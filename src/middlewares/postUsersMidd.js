const validate = require('../services/usersService');

module.exports = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await validate.validateUser(name, email, password);

  if (newUser.status) {
    return res.status(newUser.status).json({ message: newUser.message });
  }

  return res.status(201).json(newUser);
};