const Joi = require('joi');
const { findByEmail } = require('../models/usersModel');

module.exports = async (req, res, next) => {
    const isInputsValid = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).validate(req.body)

    if (isInputsValid.error) {

        const err = new Error('All fields must be filled');

        err.statusCode = 401;

        return next(err)
    }

    const userDataDB = await findByEmail(req.body.email)

    if (userDataDB.password !== req.body.password) {

        const err = new Error('Incorrect username or password');

        err.statusCode = 401;

        return next(err)
    }
    next();
}