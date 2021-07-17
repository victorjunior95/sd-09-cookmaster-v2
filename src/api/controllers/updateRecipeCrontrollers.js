const services = require('../services');

module.exports = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const { id } = req.params;
  const result = await services.updateRecipeService(authorization, id, body);

  res.status(200).json(result);
};
