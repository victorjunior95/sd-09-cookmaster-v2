const userModels = require('../Models/user');

const login = async () => {
    const user = await userModels.login();
    console.log(user, 'service');
    return user;
};

module.exports = {
    login,
};