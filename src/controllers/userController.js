const { createUserService } = require('../services/userService');

const CREATED = 201;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await createUserService(name, email, password);

  if (newUser.isError) return res.status(newUser.status).json({ message: newUser.message });
  res.status(CREATED).json({ 
    user: newUser,
  });
};

module.exports = {
  createUser,
};