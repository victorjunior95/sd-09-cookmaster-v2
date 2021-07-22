const {
  createUserService,
} = require('../services/userService');

const CREATED = '201';

const createUserControl = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await createUserService(name, email, password);

  if (user.err) {
    return res.status(user.err.error).send({ message: user.err.message });
  }

  return res.status(CREATED).json({ user });
};

module.exports = {
  createUserControl,
};