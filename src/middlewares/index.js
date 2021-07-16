const errorHandler = require('./errorHandler');
const validateNewUser = require('./validateNewUser');
const validateLoginInput = require('./validateLoginInput');
const authCheck = require('./authCheck');
const validateRecipeInput = require('./validateRecipeInput');
const checkOwnerAdmin = require('./checkOwnerAdmin');
const upload = require('./multer');

module.exports = {
  errorHandler,
  validateNewUser,
  validateLoginInput,
  authCheck,
  validateRecipeInput,
  checkOwnerAdmin,
  upload,
};
