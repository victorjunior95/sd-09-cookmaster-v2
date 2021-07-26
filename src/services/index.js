const insertNewUser = require('./insertNewUser');
const insertNewRecipe = require('./insertNewRecipe');
const searchEmail = require('./searchEmail');
const validateNewUser = require('./validateNewUser');
const validateToken = require('./validateToken');
const validateUser = require('./validateUser');

module.exports = {
  insertNewRecipe,
  insertNewUser,
  searchEmail,
  validateNewUser,
  validateToken,
  validateUser,
};
