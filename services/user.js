const Utils = require('../src/utils');
const Model = require('../models');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';
const allFields = 'All fields must be filled';
const incorrectCredentional = 'Incorrect username or password';
const onlyAdmin = 'Only admins can register new admins';

const createUser = async (name, email, password) => {
  // console.log('SERVICE createUser req.body', name, email, password);

  const { error } = Utils.validateCredentialsData({ name, email, password });
  if (error) throw Error(invalidEntries);

  const userAlreadyExist = await Model.findUser(email);
  if (userAlreadyExist) throw Error(emailRegistered);

  return Model.createUser(name, email, password);
};

const login = async (email, password) => {
  // console.log('SERVICE login req.body', email, password);

  const { error } = Utils.validateCredentialsData({ name: 'name', email, password });
  // console.log('SERVICE login error', error);
  if (error) throw Error(allFields);

  const user = await Model.findUser(email);
  // console.log('SERVICE login user', user);
  if (!user || user.password !== password) throw Error(incorrectCredentional);

  // console.log('SERVICE login user', user);
  const { _id, role } = user;
  const token = Utils.tokenEncrypt({ _id, email, role });

  return token;
};

const createAdmin = async (token, name, email, password) => {
  // console.log('SERVICE createAdmin req.body', name, email, password);
  const decoded = Utils.tokenDecrypt(token);
  if (decoded.role !== 'admin') throw Error(onlyAdmin);
  return Model.createAdmin(name, email, password);
};

module.exports = {
  createUser,
  login,
  createAdmin,
};
