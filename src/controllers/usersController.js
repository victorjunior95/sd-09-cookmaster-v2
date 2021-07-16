const usesService = require('../services/usesService');

const usersCreate = async (req, res, next) => {
  try {
  const { email, name, password } = req.body;

  const userCreate = await usesService.createUserService(email, name, password);
  return res.status(201).json({ user: userCreate });
  } catch (error) {
  return next(error);
  }
};

module.exports = {
  usersCreate,
};