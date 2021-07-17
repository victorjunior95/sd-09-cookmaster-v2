const services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  const result = await services.getRecipeByIdService(id);
  
  res.status(200).json(result);
};
