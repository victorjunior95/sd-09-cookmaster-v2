const usersService = require('../service/usersService');

const postUser = async (req, res, next) => {
  try {
    const newUser = await usersService.newUser(req.body);
    return res.status(201).json({ user: newUser });
  } catch (err) {
    return next(err);
  }
};

module.exports = { postUser };
