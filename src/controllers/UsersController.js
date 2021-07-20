const UsersService = require('../services/UsersService');

const addNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const response = await UsersService.newUser(name, email, password);
    res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e);
    console.log('Esse aq');
    next(e);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await UsersService.userLogin(email, password);
    res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e);
    console.log('Esse aq');
    next(e);
  }
};

module.exports = {
  addNewUser,
  userLogin,
};