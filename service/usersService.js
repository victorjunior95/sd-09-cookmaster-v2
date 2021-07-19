const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const validateDataRegister = (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    const erro = {
        status: 400,
        message: 'Invalid entries. Try again.',
      };
    throw erro;
  }
};

const emailValidator = async (email) => {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex) {
    const erro = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw erro;
  }
  const emailExists = await userModel.findEmail(email);
  if (emailExists !== null) {
    const erro = {
      status: 409,
      message: 'Email already registered',
    };
  throw erro;
  }
};

const userRegisterService = async (userData) => {
  validateDataRegister(userData);
  await emailValidator(userData.email);
  const newUser = await userModel.userRegisterModel(userData);
  const { name, email, role, _id } = newUser.ops[0];
  const userWithouPass = {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
  return userWithouPass;
};

const generateToken = (userData) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const secret = '1234';
  const token = jwt.sign({ data: JSON.stringify(userData) }, secret, jwtConfig);
  if (!token) {
    const erro = {
      status: 400,
      message: 'tokenn xxx',
    };
  throw erro;
  }
  return { token };
};

const loginService = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    const erro = {
      status: 401,
      message: 'All fields must be filled',
    };
    throw erro;
  }
  const result = await userModel.validadeLogin(email, password);
  if (!result) {
    const erro = {
      status: 401,
      message: 'Incorrect username or password',
    };
    throw erro;
  }
  return generateToken(userData);
};

module.exports = {
  userRegisterService,
  loginService,
};
