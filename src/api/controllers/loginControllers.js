const services = require('../services');

module.exports = async (req, res) => {
  const tokenResult = await services.loginServices(req.body);
  res.status(200).json({ token: tokenResult });
};
