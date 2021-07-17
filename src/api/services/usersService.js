const usersModel = require('../models/usersModel');

const getAllUsers = async () => usersModel.getAll();

const createNewUser = async (name, email, password) => {
  const userArr = await usersModel.getAll();

  const findUser = userArr.find(result => result.user.email === email);
  if (findUser) {
    return { err: { 
      'message': 'Email already registered',
    } };
  };

  return await usersModel.create(name, email, password);
};

const loginUser = async (email, password) => {
  const login = await usersModel.login(email, password);
  if (!login) return { err: {
    message: 'Incorrect username or password'
  } };
  return login;
};

module.exports = {
  getAllUsers,
  createNewUser,
  loginUser,
};
