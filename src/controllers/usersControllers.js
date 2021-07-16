const userService = require('../services/userService');

const registerNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerNewUser,
};
