const Users = require('../models/UsersModel');
const utils = require('../utils');

const CONFLICT_REQUEST = {
  status: 409,
  message: 'Email already registered',
};

const checkBody = async (name, email, password) => {
  console.log(`service ${name}, ${email}, ${password}`);
  // validar validateBody
  const bodyValidated = utils.validateBody.validateBody(name, email, password);
  console.log(`service ${bodyValidated}`);
  if (bodyValidated) return bodyValidated;

  // conferir se email já existe
  const emailAlreadyExist = await Users.findByEmail(email);
  console.log(`service ${emailAlreadyExist}`);
  if (emailAlreadyExist) return CONFLICT_REQUEST;
};

const register = async (user) => {
  // console.log(`service ${user.user.name}, ${user.user.email},
  // ${user.user.password}, ${user.user.role}`);
  const newUser = await Users.register(user);
  // console.log(`service ${newUser.user.name}, ${newUser.user.email}, ${newUser.user.role}`);
  return { status: 201, message: newUser };
};

module.exports = {
  checkBody,
  register,
};
