const Users = require('../models/users');
const { validateCreate, validateLogin } = require('../middlewares/validateUsers');

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

const login = async ({ email, password }) => {
  // valida se foi enviado email e password
  const validLogin = validateLogin(email, password);
  if (validLogin) return validLogin;

  // verifica se email e password constam no banco de dados
  const allUsers = await Users.getAllUsers();
  const exist = allUsers
  .find((user) => user.email === email && user.password === password);

  if (!exist) {
    return {
      status: 401,
      error: {
        message: 'Incorrect username or password', 
      },
    };
  }
  
  return {
    status: 200,
    user: exist,
  };
};

const createAdmin = async ({ name, email, password, role: roleRegister }) => {
  if (roleRegister !== 'admin') {
    return {
      status: 403,
      error: {
        message: 'Only admins can register new admins', 
      },
    };
  }
  
  const role = 'admin';
  const newAdmin = await Users.createAdmin(name, email, password, role);

  return newAdmin;
};

module.exports = {
  create,
  login,
  createAdmin,
};