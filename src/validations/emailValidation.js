const usersModel = require('../models/usersModel')

const validateEmail = (email) => {
  const emailRegex =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  // const emailRegex = /.+\@.+\..+/;

  return emailRegex.test(email);
};

const emailExists = async (email) => await usersModel.getUserByEmailFromDb(email);

module.exports = {
  validateEmail,
  emailExists,
};
