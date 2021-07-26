// requisito 1
const usersModels = require('../models/userModels');
// const { status } = require('../schema/status');
// registrando os campos no mongo
const postUser = async (name, email, password) => usersModels.registerUser(name, email, password);

module.exports = {
  postUser,
};
