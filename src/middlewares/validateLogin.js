const jwt = require('jsonwebtoken');
const validate = require('../services/usersService');

const secret = 'segredao';

module.exports = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const isValidCredentials = await validate.checkingLogin(email, password);

  if (isValidCredentials.status) {
    return res.status(isValidCredentials.status).json({ message: isValidCredentials.message });
  }

  const { password: _, name, ...withoutPasswordAndName } = isValidCredentials;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(withoutPasswordAndName, secret, jwtConfig);

  res.status(200).json({ token });
};
