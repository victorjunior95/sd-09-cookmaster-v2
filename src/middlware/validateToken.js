const jwt = require('jsonwebtoken');
const { findByemail } = require('../models/createUserModel');
const { secret } = require('../utils/createToke');
const { jwtMalformed, missingAuthToken } = require('../dictionaryError');

async function validateToken(req, _res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return next(missingAuthToken());
    }
    try {
        const { email } = jwt.verify(token, secret);

        const user = await findByemail(email);
        if (!user) return next(jwtMalformed());

        const { password, ...userWithoutPassword } = user;

        req.user = userWithoutPassword;
        return next();
    } catch (error) {
        if (error.message === 'jwt malformed') return next(jwtMalformed()); 
        return next(error);
    }
}

module.exports = {
    validateToken,
};