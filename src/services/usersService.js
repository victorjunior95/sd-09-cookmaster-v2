const { createUserModel } = require('../models/usersModel');

const createUserService = async (name, email, password) => {
    const newUser = await createUserModel(name, email, password);
    return newUser;
}

module.exports = {
    createUserService,
}