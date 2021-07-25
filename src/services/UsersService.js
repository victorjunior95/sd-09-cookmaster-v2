const Users = require('../models/UsersModel');
const utils = require('../utils');

const CONFLICT_REQUEST = {
  status: 409,
  message: 'Email already registered',
};

const checkBody = async (name, email, password) => {
  // validar validateBody
  const bodyValidated = utils.validateBody.validateBody(name, email, password);
  if (bodyValidated) return bodyValidated;

  // conferir se email já existe
  const emailAlreadyExist = await Users.findByEmail(email);
  if (emailAlreadyExist) return CONFLICT_REQUEST;
};

const register = async (user) => {
  console.log(`service ${user.name}, ${user.email}, ${user.password}, ${user.role}`);
  const newUser = await Users.register(user);
  console.log(`service ${newUser.name}, ${newUser.email}, ${newUser.role}`);
  return { status: 201, message: newUser };
};

module.exports = {
  checkBody,
  register,
};
