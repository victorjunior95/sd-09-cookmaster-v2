const Joi = require('joi');
const usersModel = require('../models/usersModel');

module.exports = async (req, res, next) => {
    const isInputsValid = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).validate(req.body);

    if (isInputsValid.error) {
        const err = new Error('Invalid entries. Try again.');
        err.statusCode = 400;
        return next(err);
    }

    const isThereEmail = await usersModel.findByEmail(req.body.email);

    if (isThereEmail) {
        const err = new Error('Email already registered');
        err.statusCode = 409;
        return next(err);
    }
    next();
};