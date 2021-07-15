const services = require('../services');

const createUserController = async (req, res) => {
  const result = await services.createUserServices(req.body);

  res.status(201).json(result);
};

module.exports = createUserController;
