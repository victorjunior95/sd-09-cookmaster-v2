const { insertUser } = require('../models');

const insertNewUser = async (name, email, password) => {
  const newUser = await insertUser(name, email, password);
  delete newUser.password; 
  return {
    code: 201,
    user: newUser,
  };
};

module.exports = insertNewUser;
