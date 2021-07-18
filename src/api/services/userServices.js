const userModel = require('../models/userModel');

const create = async (name, email, password) => {
  const user = await userModel.getByEmail(email);
 
  if (user) {
    throw Object.assign(
      new Error('Email already registered'),
      { code: 'conflict' },
   );
  }

  const newuser = await userModel.create(name, email, password);

  return newuser;
};

module.exports = { 
  create,
};