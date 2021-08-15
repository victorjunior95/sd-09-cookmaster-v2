const { createUserModel, createNewUserModel } = require('../models/usersModel');

const createUserService = async (name, email, password) => {
    const newUser = await createUserModel(name, email, password);
    return newUser;
};

const createNewAdminService = async (name, email, password) => {
    const newAdmin = await createNewUserModel(name, email, password);
    const { password: _, ...newAdminUuser } = newAdmin;
    return newAdminUuser;
};

module.exports = {
    createUserService,
    createNewAdminService,
};
