const {
  createUser,
  finUserByEmail,
} = require('../models/userModel');

const { validateUser } = require('../middlewares/validateUser');

const createUserService = async (name, email, password) => {
  const userIsValid = await validateUser(name, email, password);
  const emailExists = await finUserByEmail(email);
  
  if (userIsValid !== true) return userIsValid;

  if (emailExists) {
    return { isError: true,
      message: 'Email already registered',
      status: 409,
    };
  }

  const user = await createUser(name, email, password);
  const { _id, role } = user.ops[0];
  return { name, email, role, _id };
};

module.exports = {
  createUserService,
};