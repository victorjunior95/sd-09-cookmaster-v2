const usersService = require('../service/usersService');
const validateJWT = require('./validateJWT');

const postUser = async (req, res, next) => {
  try {
    const newUser = await usersService.newUser(req.body, 'user');
    return res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

const postAdmin = [
  validateJWT,
  async (req, res, next) => {
    try {
      const { role } = await req.user;
      if (role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can register new admins' });
      }
      const newUser = await usersService.newUser(req.body, 'admin');
      return res.status(201).json({ user: newUser });
    } catch (err) {
      next(err);
    }
  },
];

module.exports = { postUser, postAdmin };
