const loginService = require('../services/loginService');
const status = require('../statuscode/status');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);

  if (result === undefined) {
    res.status(status.UNAUTHORIZED).json({ message: status.ERR_ALL });
  }

  if (result === 'null') {
    res.status(status.UNAUTHORIZED).json({ message: status.ERR_INCORRECT });
  }

  if (result !== 'null' && result !== undefined) {
    return res.status(status.OK).json({ token: result });
  }
};

module.exports = {
  login,
};
