const Users = require('../models/UsersModel');
const utils = require('../utils');

const CONFLICT_REQUEST = {
  status: 409,
  message: 'Email already registered',
};

const register = async (user) => {
  const { name, email, password } = user;
  // validar validateBody
  const bodyValidated = utils.validateBody(name, email, password);
  if (bodyValidated) return bodyValidated;

  // conferir se email já existe
  const emailAlreadyExist = await Users.findByEmail(email);
  if (emailAlreadyExist) return CONFLICT_REQUEST;

  const newUser = await Users.register(user);
  return { status: 201, message: newUser };
};

module.exports = {
  register,
};
