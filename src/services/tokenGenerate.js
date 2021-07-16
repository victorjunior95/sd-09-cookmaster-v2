const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = { generateToken };
