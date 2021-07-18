const userModels = require('../Models/user');

const addUser = async (name, email, password) => {
    const user = await userModels.addUser(name, email, password);
    console.log(user, 'service');
    return user;
};

module.exports = {
    addUser,
};