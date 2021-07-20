const usersModel = require('../models/usersModel');
const { validateUser } = require('../middlewares/validateUser');

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

module.exports = {
  createUser,
};