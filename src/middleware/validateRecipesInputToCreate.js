const Joi = require('joi');

module.exports = async (req, res, next) => {
    const isInputsValid = Joi.object({
        name: Joi.string().required(),
        ingredients: Joi.string().required(),
        preparation: Joi.string().required(),
    }).validate(req.body);

    if (isInputsValid.error) {
        const err = new Error('Invalid entries. Try again.');
        err.statusCode = 400;
        return next(err);
    }
    next();
};
