const usersModel = require('../models/usersModel');
const { validateUser, validateLogin } = require('../middlewares/validateUser');

const createUser = async (name, email, password) => {
  const userIsValid = await validateUser(name, email, password);
  const emailExists = await usersModel.findUserByEmail(email);
  
  if (userIsValid !== true) return userIsValid;

  if (emailExists) {
    return { isError: true,
    message: 'Email already registered',
    status: 409, 
  };
}
const user = await usersModel.createUser(name, email, password);
const { _id, role } = user.ops[0];
  return { name, email, role, _id };
};

const login = async (email, password) => {
const loginIsValid = await validateLogin(email, password);
const userExists = await usersModel.findUserByEmail(email);

if (loginIsValid !== true) return loginIsValid;
if (!userExists || userExists.password !== password) {
  return {
    isError: true,
    message: 'Incorrect username or password',
    status: 401,
  };
}
return userExists;
};

module.exports = {
  createUser,
  login,
};