const service = require('../service');

const signIn = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { status, user, message } = await service.users.signIn(name, email, password, role);

  if (status !== 201) return res.status(status).json({ message });
  res.status(status).json({ user });
};

module.exports = {
  signIn,
};
