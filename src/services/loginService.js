const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');

const secret = 'trybe-t9';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const verifyPassAndMail = (mail, pass) => {
  if (!pass || !mail) { return undefined; }
};

const login = async (mail, pass) => {
  const byEmail = await userModels.getByEmail(mail);
  verifyPassAndMail(mail, pass);
  if (byEmail !== null) {
    const { password, email } = byEmail;
    if (password === pass) {
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      return token;
    }
  } else {
    return 'null';
  }
};

// const login = async (mail, pass) => {
//   const byEmail = await userModels.getByEmail(mail);

//   if (!pass || !mail) { return undefined; }

//   if (byEmail !== null) {
//     const { password, email } = byEmail;

//     if (password === pass) {
//       const token = jwt.sign({ data: email }, secret, jwtConfig);
//       return token;
//     }
//   } else {
//     return 'null';
//   }
// };

module.exports = {
  login,
};