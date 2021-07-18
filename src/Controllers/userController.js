// const { findByEmail } = require('../Models/userModel');
const userServices = require('../Services/userService');

const emptyNotAllowed = (email, name, password) => {
    if (email === undefined || name === undefined || password === undefined) {
        return true;
    } return false;
};

const testEmail = (email) => {
    const rgx = /\S+@\S+\.\S+/;
    return rgx.test(email);
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userServices.addUser(name, email, password);
    const isEmpty = emptyNotAllowed(email, name, password);
    const testMail = testEmail(email);
    if (user === null) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    if (user !== null && isEmpty === false && testMail === true) {
        return res.status(201).json({ user });
    }
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
};

module.exports = {
    addUser,
};