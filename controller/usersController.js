const usersService = require('../service/usersService');

const postUser = async (req, res, next) => {
  try {
    const newUser = await usersService.newUser(req.body, 'user');
    return res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

const postAdmin = async (req, res, next) => {
  try {
    const { role } = await req.user;
    console.log('role', role);
    const newUser = await usersService.newUser(req.body, 'admin', role);
    return res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

module.exports = { postUser, postAdmin };
