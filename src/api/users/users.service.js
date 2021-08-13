const { tokenValidator } = require('../login/login.service');
const usersModel = require('./users.model');

const newUserValidation = (name, password, email) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !password || !email || !validEmail) {
    return { status: 400, data: { message: 'Invalid entries. Try again.' } };
  }
};

const uniqueEmailVerication = async (email) => {
  const user = await usersModel.getUserByEmail(email);

  return user && { status: 409, data: { message: 'Email already registered' } };
};

const createUser = async ({ name, email, password }) => {
  const role = 'user';
  
  const userValidationError = newUserValidation(name, password, email);

  if (userValidationError) return userValidationError;

  const uniqueEmailError = await uniqueEmailVerication(email);

  if (uniqueEmailError) return uniqueEmailError;

  const user = await usersModel.addUser({ name, email, password, role });

  return {
    status: 201,
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

const createAdmin = async ({ name, email, password }, token) => {
  const { role } = await tokenValidator(token);

  if (role !== 'admin') {
    return { status: 403, data: { message: 'Only admins can register new admins' } };
  }

  const userValidationError = newUserValidation(name, password, email);

  if (userValidationError) return userValidationError;

  const uniqueEmailError = await uniqueEmailVerication(email);

  if (uniqueEmailError) return uniqueEmailError;

  const user = await usersModel.addUser({ name, email, password, role });
  return { status: 201, data: { user } };
};

module.exports = {
  createUser,
  newUserValidation,
  createAdmin,
};
