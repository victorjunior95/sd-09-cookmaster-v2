const userModels = require('../Models/userModel');

const addUser = async (name, email, password) => {
    const userEmail = await userModels.findByEmail(email);
    if (userEmail !== null) {
        return null;
    }
    const user = await userModels.addUser(name, email, password);
    return user;
};

// const findByEmail = async (email) => {
//     const userEmail = await userModels.findByEmail(email);
//     return userEmail;
// };

module.exports = {
    addUser,
    // findByEmail,
};