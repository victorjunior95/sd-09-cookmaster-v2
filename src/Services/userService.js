const userModels = require('../Models/userModel');

const addUser = async (name, email, password) => {
    const userEmail = await userModels.findByEmail(email);
    console.log(userEmail, 'useremail');
    if (userEmail === null || userEmail.email === null) {
        console.log('entrei');
        const user = await userModels.addUser(name, email, password);
        return user;
    } if (userEmail !== null && userEmail.email !== null) {
        console.log('não entrei');
        return null;
    }
};

// const findByEmail = async (email) => {
//     const userEmail = await userModels.findByEmail(email);
//     return userEmail;
// };

module.exports = {
    addUser,
    // findByEmail,
};