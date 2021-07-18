const users = require('../models/usersModel');
const validate = require('../utils/validateUser');
const { verifyToken } = require('../utils/validateToken');

const create = async (user) => {
  await validate.user(user);
  const newUser = user;
  newUser.role = 'user';
  const result = await users.create(newUser);
  return result;
};

const createAdmin = async (user, token) => {
  await validate.user(user);
  const userAuth = verifyToken(token);
  validate.userAdmin(userAuth);
  const newUser = user;
  newUser.role = 'admin';
  const result = await users.create(newUser);
  return result;
};

module.exports = {
  create,
  createAdmin,
};
