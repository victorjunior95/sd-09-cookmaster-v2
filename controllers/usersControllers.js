const usersServices = require('../services/usersServices');
const { validateRegisteredEmail } = require('../services/usersServices/validateUserInfos');

const badRequest = 400;
const created = 201;
const conflict = 409;
// const okay = 200;
// const unauthorized = 401;

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

module.exports = {
  insertUser,
};
