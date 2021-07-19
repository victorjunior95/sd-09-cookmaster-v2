const usersModel = require('../models/usersModel');

const add = async (name, email, password, role) => {
  const roleToBeInserted = role || 'user';
  const user = await usersModel.add(name, email, password, roleToBeInserted);

  if (!user) return null;

  const { password: pw, ...userData } = user;

  return { user: userData };
};

module.exports = {
  add,
};
