const services = require('../services');

module.exports = async (_req, res) => {
  const result = await services.getRecipesAllService();
  res.status(200).json(result);
};
