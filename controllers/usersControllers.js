const usersServices = require('../services/usersServices');

const badRequest = 400;
const created = 201;
// const okay = 200;
// const unauthorized = 401;
// const conflict = 409;

const insertUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersServices.insertUser(name, email, password);
  if (newUser.message) {
    return res.status(badRequest).json(newUser);
  }
  return res.status(created).json(newUser);
};

module.exports = {
  insertUser,
};
