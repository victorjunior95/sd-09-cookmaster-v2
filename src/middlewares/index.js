const validateToken = require('./validateToken');
const validateRoleUser = require('./validateRoleUser');
const error = require('./error');
const uploadPicture = require('./pictures');

module.exports = {
  validateToken,
  validateRoleUser,
  error,
  uploadPicture,
};