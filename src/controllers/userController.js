const userService = require('../services/usersService');
const httpStatus = require('./httpStatus');
const helpers = require('../helpers');

const CONFLICT = 409;

const createUser = [
  helpers.checkUserData,
  async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await userService.getUserByEmail(email);
  if (userEmail) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  const user = await userService.createUser(name, email, password);

  return res.status(httpStatus.CREATED).json(user);
}];

module.exports = {
  createUser,
};