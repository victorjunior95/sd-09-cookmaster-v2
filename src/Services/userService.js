const userModels = require('../Models/userModel');

const addUser = async (name, email, password) => {
    const userEmail = await userModels.findByEmail(email);
    if (userEmail !== null) {
        return null;
    }
    const user = await userModels.addUser(name, email, password);
    return user;
};

module.exports = {
    addUser,
};