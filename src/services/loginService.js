const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/usersModel');

const SECRET = 'essaédificil';

const LoginService = async (email) => {
    const userDataDB = await findByEmail(email);

    const jwtConfig = {
        expiresIn: '1h',
        algorithm: 'HS256',
    };
    const token = jwt.sign(userDataDB, SECRET, jwtConfig);
    return token;
};

module.exports = {
    LoginService,
};
