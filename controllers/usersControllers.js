const usersServices = require('../services/usersServices');
const { validateRegisteredEmail } = require('../services/usersServices/validateUserInfos');
const {
  validateCompatibleLoginData,
  validateLoginData,
} = require('../services/usersServices/validateLoginData');

const badRequest = 400;
const created = 201;
const conflict = 409;
const unauthorized = 401;
const okay = 200;

const insertUser = async (req, res) => {
  const { name, email, password } = req.body;
  const registeredEmail = await usersServices.getUserByEmail(email);
  if (registeredEmail) {
    return res.status(conflict).json(validateRegisteredEmail());
  }
  const newUser = await usersServices.insertUser(name, email, password);
  if (newUser.message) {
    return res.status(badRequest).json(newUser);
  }
  return res.status(created).json(newUser);
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const createdToken = await usersServices.createToken(email, password);
  const validLoginData = validateLoginData(email, password);
  if (validLoginData) {
    return res.status(unauthorized).json(validLoginData);
  }
  const compatibleUserData = await validateCompatibleLoginData(email, password);
  if (compatibleUserData) {
    return res.status(unauthorized).json(compatibleUserData);
  }
  return res.status(okay).json({ token: createdToken });
};

module.exports = {
  insertUser,
  userLogin,
};
