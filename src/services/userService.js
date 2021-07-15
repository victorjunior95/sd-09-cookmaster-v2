const userModels = require('../models/userModels');

const addUser = async (name, email, password) => { 
  const result = await userModels.addUser(name, email, password);
  const { password: pass, ...dbuser } = result;

  return dbuser;
};

module.exports = {
  addUser,
};