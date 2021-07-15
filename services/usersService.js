const usersModel = require('../models/usersModel');

const addUser = async (name, email, password, role) => {
  const roleToBeInserted = !role ? 'user' : 'admin';
  const user = await usersModel.addUser(name, email, password, roleToBeInserted);

  if (!user) return null;

  const { password: pw, ...userData } = user; 

  return { user: userData };
};

module.exports = {
  addUser,
};