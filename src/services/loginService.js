const usersModel = require('../models/usersModel');
const errorMiddleware = require('../middlewares/errorMiddleware');

// primeiro as validações e depois o token

const userLoginService = async (email, password) => {
  const loginUser = await usersModel.loginUsers(email, password);
  if (!loginUser || loginUser.password !== password) {
    throw errorMiddleware.validateError(401, 'Incorrect username or password');
  }
  // gerar o token
  const { password: passdb, ...loginUserWithout } = loginUser;

  return loginUserWithout;
};

module.exports = {
  userLoginService,
};