const jwt = require('jsonwebtoken');
const model = require('../../../model/User');

const segredo = 'supersegredotrybe';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`token no header: ${token}`);
  if (!token) return res.status(401).json({ message: 'jwt malformed' });
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await model.findByEmail(decoded.data.email);
    console.log(`user no auth: ${user}`);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

// https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/096ab7ca-bfa4-41d2-9b14-fe5a42aa956c/implementando-jwt/e8ebbc5b-1a0d-4baa-97df-d355be493891?use_case=next_button