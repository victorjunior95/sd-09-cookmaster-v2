const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'betterPasswordOfWorld';

module.exports = async (emailUser) => {
    const getUser = await userModel.getUserByEmail(emailUser);
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };

    const { _id: id, email, role } = getUser;
    const infoUser = { id, email, role };

    const token = jwt.sign(infoUser, secret, jwtConfig);

    return { token };
};
