const usersModel = require('../models/usersModel');

const add = async (name, email, password, role) => {
  const roleToBeInserted = role || 'user';
  const user = await usersModel.add(name, email, password, roleToBeInserted);

  if (!user) return null;

  const { password: pw, ...userData } = user;

  return { user: userData };
};

const addAdmin = async (name, email, password) => {
  const admin = await usersModel.addAdmin(name, email, password);

  return { user: admin };
};

module.exports = {
  add,
  addAdmin,
};
