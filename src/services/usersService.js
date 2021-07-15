const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');
const { errorsUsers } = require('../helpers/errorMessagens');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

const secret = 'meusegredosuperforte';

const generateMessageError = (status, message) => ({ status, message });

const validateRequiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return generateMessageError(BAD_REQUEST, errorsUsers.invalidEntries);
  }
};

const validateEmail = async (email) => {
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (!regex.test(email)) return generateMessageError(BAD_REQUEST, errorsUsers.invalidEntries);

  const userFound = await usersModel.findByEmail(email);
  if (userFound.length) return generateMessageError(CONFLICT, errorsUsers.duplicateEmail);
};

const addUser = async (dataUser) => {
  const { name, password, email } = dataUser;
  const invalideEntries = validateRequiredFields(name, email, password);
  const errorEmail = await validateEmail(email);

  if (invalideEntries) throw (invalideEntries);
  if (errorEmail) throw (errorEmail);

  const response = await usersModel.addUser(dataUser);
  return response;
};

const login = async (email, password) => {
  if (!email || !password) {
    throw generateMessageError(UNAUTHORIZED, errorsUsers.empytFields);
  }

  const user = await usersModel.login(email, password);

  if (!user) throw generateMessageError(UNAUTHORIZED, errorsUsers.incorrectData);

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const { email: emailUser, _id: id, role } = user;

  const token = jwt.sign({ emailUser, id, role }, secret, jwtConfig);
  return { token };
};

module.exports = {
  addUser,
  login,
};
