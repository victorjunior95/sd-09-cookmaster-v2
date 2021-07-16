const UsersModel = require('../models/UsersModel');

const verifyName = (name, email, password) => {
 const emailRegex = /^[\w.]+@[a-z]+.\w{2,3}$/g.test(email); 
 const errorObj = {
    status: 400,
    message: 'Invalid entries. Try again.',
  };

  if (!name || !email || !password) throw errorObj;

  if (!emailRegex) throw errorObj;
};

const verifyEmail = async (email) => {
  const err = {
    status: 409,
    message: 'Email already registered',
  };
  const userEmail = await UsersModel.findEmail(email);
  console.log('verificação', userEmail);
  if (userEmail) throw err;
};

const createUser = async (user) => {
  const { name, email, password } = user;
  verifyName(name, email, password);
  await verifyEmail(email);
  const newUser = await UsersModel.createUser(user);
  return newUser;
};

module.exports = {
  createUser,
};