const users = require('../models/usersModel');
const validate = require('../utils/validateUser');

const create = async (user) => {
  await validate.user(user);
  const result = await users.create(user);
  return result;
};

module.exports = {
  create,
};