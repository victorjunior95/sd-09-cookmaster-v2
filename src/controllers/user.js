const User = require('../services/user');

module.exports = async (req, res, next) => {
  try {
    const newUser = await User(req.body);
    return res.status(201).json({ user: { ...newUser } });
  } catch (error) {
    return next(error);
  }
};
