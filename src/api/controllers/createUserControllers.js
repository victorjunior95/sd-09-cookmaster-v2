const services = require('../services');

module.exports = async (req, res) => {
  const result = await services.createUserServices(req.body);

  res.status(201).json(result);
};
