const Users = require('../models/users');
const { validateCreate } = require('../middlewares/validateCreate');

const create = async ({ name, email, password, role = 'user' }) => {
  // valida se tem email, senha e nome
  const validateInfos = validateCreate(name, email, password);
  if (validateInfos) return validateInfos;

  // valida campo email unico
  const allUsers = await Users.getAllUsers();
  const verifyUser = allUsers.some((user) => user.email === email);
  if (verifyUser) {
    return {
      status: 409,
      error: {
        message: 'Email already registered', 
      },
    };
  }

  const newUser = Users.create(name, email, password, role);
  return newUser;
};

module.exports = {
  create,
};