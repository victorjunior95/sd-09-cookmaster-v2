const jwt = require('jsonwebtoken');
const { findUser } = require('../models/usersModel');

const segredo = 'meuSegredoMuitoDifícil';

const login = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, segredo, jwtConfig);
  
  return res.status(200).send({ token });
};

module.exports = login;