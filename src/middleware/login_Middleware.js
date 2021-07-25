const jwt = require('jsonwebtoken');
const { validateUser } = require('../services');

const secret = 'mysecret';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = {
    email,
    password,
  };

  const validate = await validateUser(user);
  if (validate !== true) {
    const { code, message } = validate; 
    return res.status(code).json({ message });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = login;
