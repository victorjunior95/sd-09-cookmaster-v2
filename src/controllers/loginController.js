const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const status = require('../status/httpCodes');

const secret = 'parangaricutirimirruaro';

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(status.FILLFIELDS).json({ message: status.FILLFIELDS_MESSAGE });
    }
    const user = await userModel.findUserByEmail(email);
    if (!user || password !== user.password) {
      return res.status(status.INCORRECT).json({ message: status.INCORRECT_MESSAGE });
    }
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user.email }, secret, jwtConfig);
    return res.status(status.OK).json({ token });
};

module.exports = {
  login,
};