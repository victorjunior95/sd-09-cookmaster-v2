const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const err = {
  message: ' ',
};

const checkEmail = (email) => {
  const regex = RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/).test(email);
  if (!regex || !email) return err;
};

const checkEmailExist = async (email) => {
  const emailChecked = await userModel.findEmail(email);
  if (emailChecked) {
    err.message = 'Email already registered';
    return err;
  }
};

const createUser = async (name, email, password) => {
  if (!name) return err;

  const validEmail = checkEmail(email);
  if (validEmail) return validEmail;

  const consultEmail = await checkEmailExist(email);
  if (consultEmail) return consultEmail;

  const role = 'user';
  const newUser = await userModel.create(name, email, password, role);
  
  const user = newUser;
  delete user.password;

  return { user };
};

const createUserAdmin = async (name, email, password) => {
  if (!name) return err;

  const validEmail = checkEmail(email);
  if (validEmail) return validEmail;

  const consultEmail = await checkEmailExist(email);
  if (consultEmail) return consultEmail;

  const role = 'admin';
  const newUser = await userModel.create(name, email, password, role);
  
  const user = newUser;
  delete user.password;

  return { user };
};

const createToken = (logon) => {
  const loged = logon;
  delete loged.password;

  const SECRET = 'paraguamicotirimiruaruvrawoffoline';
  const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

 const token = jwt.sign(loged, SECRET, jwtConfig);

 return token;
};

const useLoguin = async (email, password) => {
  const validEmail = checkEmail(email);
  if (validEmail || !password) {
    err.message = 'All fields must be filled';
    return err;
  }

  const logon = await userModel.login(email, password);
  if (!logon) {
    err.message = 'Incorrect username or password';
    return err;
  }

  const token = createToken(logon);

  return { token };
};

module.exports = {
  createUser,
  useLoguin,
  createUserAdmin,
};