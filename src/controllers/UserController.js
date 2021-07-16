const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  try {
  const { name, email, password } = req.body;
  const newUser = await UserService.createUser(name, email, password);
  return res.status(201).json(newUser);
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await UserService.findUser(email);

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  createUser,
  login,
};