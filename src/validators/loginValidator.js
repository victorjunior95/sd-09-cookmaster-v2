const { isEmailValid } = require('./helpers');

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function loginValidator(req, res, next) {
    const { email, password } = req.body;
    if (!password || !isEmailValid(email)) {
        res.status(401).json({ message: 'All fields must be filled' });
        return;
    }
    next();
}

module.exports = loginValidator;