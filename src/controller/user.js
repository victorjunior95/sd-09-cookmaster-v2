const usersService = require('../service/user');
// const validateJWT = require('./jwtValidation');

const addUserPost = async (req, res, next) => {
  try {
    const newUser = await usersService.addUser(req.body, 'user');
    return res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

module.exports = { addUserPost };