const errorHandler = require('./errorHandler');
const validateNewUser = require('./validateNewUser');
const validateLoginInput = require('./validateLoginInput');
const authCheck = require('./authCheck');
const validateRecipeInput = require('./validateRecipeInput');

module.exports = {
  errorHandler,
  validateNewUser,
  validateLoginInput,
  authCheck,
  validateRecipeInput,
};
