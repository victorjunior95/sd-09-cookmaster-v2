const userModel = require('../models/userModel');

const UNAUTHORIZED = 401;

const validate = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
    }
    next();
};

const validateEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;
    
    const getUser = await userModel.getUserByEmail(email);

    if (!getUser) {
        return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    }
    if (getUser.password !== password) {
        return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    }
    next();
};

module.exports = {
    validate,
    validateEmailAndPassword,
};