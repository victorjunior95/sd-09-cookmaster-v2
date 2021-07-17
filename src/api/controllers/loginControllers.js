const services = require('../services');

module.exports = async (req, res) => {
  const result = await services.loginServices(req.body);
  res.status(200).json(result);
};
