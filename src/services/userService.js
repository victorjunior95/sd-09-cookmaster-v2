const {
  createUser,
  findUserByEmail,
} = require('../models/userModel');

const { validateUser, validateLogin } = require('../middlewares/validateUser');

const createUserService = async (name, email, password) => {
  const userIsValid = await validateUser(name, email, password);
  const emailExists = await findUserByEmail(email);
  
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

const loginService = async (email, password) => {
  const loginIsValid = await validateLogin(email, password);
  const userExists = await findUserByEmail(email);

  if (loginIsValid !== true) return loginIsValid;
  if (!userExists || userExists.password !== password) {
    return { isError: true,
      message: 'Incorrect username or password',
      status: 401,
    };
  }
  return userExists;
};

module.exports = {
  createUserService,
  loginService,
};