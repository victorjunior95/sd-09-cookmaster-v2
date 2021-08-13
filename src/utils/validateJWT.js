const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Jim Kirk is the best Starfleet Capitain';
// JWT_EXPIRATION_TIME = you have to specify time limit like you want thattoken expire in 24 hours you have to add  60 * 60 * 24 or  86400 // 24 hours

const tokenEncrypt = (data) => 
   jwt.sign(data, JWT_SECRET, {
   expiresIn: '1d',
  });

const tokenDecrypt = (token) => {
  if (!token) return false;
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  tokenEncrypt,
  tokenDecrypt,
};
