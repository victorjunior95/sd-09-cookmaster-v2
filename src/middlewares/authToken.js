const jwt = require('jsonwebtoken');
const connection = require('../models/connection');
const UserModel = require('../models/users');

const secret = 'secretToken';

const authToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await UserModel.getUser(decoded.email);

    if (!user) {
      return next({ code: 401, message: 'Erro ao procurar usuário do token.' });
    }

    const { _id, password, ...userWithOutPasswor } = decoded;

    req.user = { id: _id, ...userWithOutPasswor };

    next();
  } catch (err) {
    return next({ code: 401, message: err.message });
  }
};

module.exports = authToken;
