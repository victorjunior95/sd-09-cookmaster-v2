/**
 * @typedef { import("express").Request} Request
 * @typedef { import("express").Response} Response
 */

const { isEmailValid } = require('./helpers');

function createUserValidator(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !password || !isEmailValid(email)) {
        res.status(400).json({
            message: 'Invalid entries. Try again.',
        });
        return;
    }
    next();
}

module.exports = createUserValidator;