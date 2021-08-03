const User = require('../model/User');

const create = async (name, password, email) => {
  const emailExists = await User.findByEmail(email);
  const error = { message: 'Email already registered' };
  if (emailExists) return error;
  const newUser = await User.create(name, password, email);
  return { user: newUser };
};

module.exports = { create };