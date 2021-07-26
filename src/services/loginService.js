const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/usersModel');

const SECRET = 'essaédificil';

const LoginService = async (email) => {
    const userDataDB = await findByEmail(email);

    const payLoad = {
        id: userDataDB._id,
        role: userDataDB.role,
        email: userDataDB.email,
    };

    const jwtConfig = {
        expiresIn: '1h',
        algorithm: 'HS256',
    };
    const token = jwt.sign(payLoad, SECRET, jwtConfig);
    return token;
};

module.exports = {
    LoginService,
};
