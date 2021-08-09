const loginService = require('./login.service');

const login = async (req, res) => {
  try {
    const { body } = req;

    const { status, data } = await loginService.login(body);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = { login };
