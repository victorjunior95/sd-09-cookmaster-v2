const usersService = require('../service/usersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUserInfo = await usersService.createUser({ name, email, password });

  res.status(201).send({ 
    user: {
      name,
      email,
      role: newUserInfo.role,
      _id: newUserInfo.insertedId,
    },
  });
};

module.exports = { createUser };