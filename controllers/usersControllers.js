const usersServices = require('../services/usersServices');

const badRequest = 400;
const created = 201;
const conflict = 409;
// const okay = 200;
// const unauthorized = 401;

const insertUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersServices.insertUser(name, email, password);
  console.log(newUser, 'USERRR');
  if (newUser.message) {
    console.log('PRIMEIRO IF');
    return res.status(badRequest).json(newUser);
  }
  if (newUser.message) {
    console.log('SEGUNDO IF');
    return res.status(conflict).json(newUser);
  }
  console.log('PASSOU DIRETO');
  return res.status(created).json(newUser);
};

module.exports = {
  insertUser,
};
