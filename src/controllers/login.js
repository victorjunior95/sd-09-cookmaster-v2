const jwt = require('jsonwebtoken');
const status = require('../api/status');
const verifyLogin = require('../services/verifyLogin');

const secret = 'plusUltra';

module.exports = async (req, res, _next) => {
  try {
    const data = await verifyLogin(req.body);
    if (data.code === 'login_not_found') {
      return res.status(status.unauthorized).json(data.err);
    }

    if (data.code === 'unauthorized') {
      return res.status(status.unauthorized).json(data.err);
    }

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data }, secret, jwtConfig);

    return res.status(status.ok).json({ token });
  } catch (error) {
    return res.status(status.badRequest).json({ message: error.message });
  }
};
