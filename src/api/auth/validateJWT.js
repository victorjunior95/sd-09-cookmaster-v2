const jwt = require('jsonwebtoken');
const userModel = require('../../../model/usersModel');

const secret = 'tokensecreto';

// trecho de código baseado no course https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-jwt-json-web-token/acf1c24f-d531-4cf0-be9b-2384e37799d7/conteudos/096ab7ca-bfa4-41d2-9b14-fe5a42aa956c/implementando-jwt/e8ebbc5b-1a0d-4baa-97df-d355be493891?use_case=side_bar
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await userModel.findEmail(decoded.data.email);

    if (!user) return res.status(401).json({ message: 'jwt malformed' });

  } catch (err) {
    return next(err);
  }
};
