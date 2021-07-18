const services = require('../services');

module.exports = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  await services.deleteRecipeService(authorization, id);

  res.status(204).end();
};
