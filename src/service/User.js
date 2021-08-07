const User = require('../model/User');

const create = async (name, password, email) => {
  const emailExists = await User.findByEmail(email);
  const error = { message: 'Email already registered' };
  if (emailExists) return error;
  const newUser = await User.create(name, password, email);
  return { user: newUser };
};

const validateAdmin = async (user) => {
  const { role } = user;
  if (role === 'admin') {
    return null;
  }
  return { message: 'Only admins can register new admins' };
};

const createAdmin = async (user, name, password, email) => {
  const invalidAdmin = await validateAdmin(user);
  if (invalidAdmin) return invalidAdmin;
  const newUser = await User.createAdmin(name, password, email);
  return { user: newUser };
};

const login = async (email, password) => {
  const makeLogin = await User.login(email, password);
  return makeLogin;
};

const getAll = async () => User.getAll();

const model = () => {
  const modelOk = User.model();
  return { model: modelOk };
};

module.exports = { create, login, createAdmin, getAll, model };