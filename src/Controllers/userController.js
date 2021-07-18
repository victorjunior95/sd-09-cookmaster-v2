const userServices = require('../Services/user');

const login = async () => {
    const user = await userServices.login();
    console.log(user, 'controller');
};

module.exports = {
    login,
};