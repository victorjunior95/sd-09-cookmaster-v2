const { getAll, create } = require('../models/userModel');

const getAllUsers = async () => getAll();

const createUsers = async (name, email, password) => create(name, email, password);

module.exports = {
    getAllUsers,
    createUsers,
};