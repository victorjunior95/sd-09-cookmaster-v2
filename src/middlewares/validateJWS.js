const jwt = require('jsonwebtoken');

const SECRET = 'segredo_mais_secreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Seu token é inválido.' });
  }
};

module.exports = validateJWT;
