const validate = require('../services/userServices');

module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await validate.validateUser(name, email, password);

    if (newUser.status) {
      return res.status(newUser.status).json({ message: newUser.message });
    }

    return res.status(201).json(newUser);
  },

  listAllUsers: async (_req, res) => {
    const users = await validate.findAllUsers();

    return res.status(200).json({ users });
  },

  listOneUser: async (req, res) => {
    const { email } = req.params;

    const listUser = await validate.findOneUser(email);

    if (listUser.err) return res.status(400).json(listUser);

    return res.status(200).json(listUser);
  },
};
