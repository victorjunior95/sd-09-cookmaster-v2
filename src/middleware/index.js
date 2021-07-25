const createUser = require('./createUser_Middleware');
const getAllRecipes = require('./getAllRecipes_Middleware');
const login = require('./login_Middleware');

module.exports = {
  createUser,
  getAllRecipes,
  login,
};
