const services = require('../services');

module.exports = async (req, res) => {
  const { body } = req;
  const { authorization } = req.headers;
  const result = await services.createRecipeServices(authorization, body);

  res.status(201).json(result);
};
