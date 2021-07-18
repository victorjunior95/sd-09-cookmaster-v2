// const { findByEmail } = require('../Models/userModel');
const userServices = require('../Services/userService');

const emptyNotAllowed = (name, email, password) => {
    if (name === undefined || email === undefined || password === undefined) {
        return true;
    }
    return false;
};

const testEmail = (email) => {
    const rgx = /\S+@\S+\.\S+/;
    // const user = await userServices.addUser(email);
    // console.log(user.email, 'testEmail');
    // if (user === null || user.email === undefined || user.email === null) {
    //     return false;
    // }
    return rgx.test(email);
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const test = testEmail(email);
    const user = await userServices.addUser(name, email, password);
    if (emptyNotAllowed(name, email, password) === true || test === false) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    if (emptyNotAllowed(name, email, password) === false && test === true) {
        return res.status(201).json({ user });
    }
};

module.exports = {
    addUser,
};