const jwt = require('jsonwebtoken');

const segredo = 'meuSegredoMuitoDifícil';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ error: 'Token não encontrado' });

  try {
    const userInfo = jwt.verify(token, segredo);
    if (!userInfo) {
      return res.status(401).send({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = userInfo;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;