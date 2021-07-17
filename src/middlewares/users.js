// const userSchema = require('../schema/users');
const usersModel = require('../models/userModel');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const validate = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

const validateEmailEqual = async (req, res, next) => {
    const { email } = req.body;
    const getAllUsers = await usersModel.getUserByEmail(email);
    console.log(getAllUsers);
    if (getAllUsers) {
      return res.status(CONFLICT).json({ message: 'Email already registered' });
    }
    next();
  };

const validateEmail = async (req, res, next) => {
    const { email } = req.body;

    const emailVerify = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    if (!emailVerify) {
        res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

module.exports = {
    validate,
    validateEmailEqual,
    validateEmail,
};