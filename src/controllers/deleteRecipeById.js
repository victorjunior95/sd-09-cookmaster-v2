const status = require('../api/status');
const verifyDeleteRecipe = require('../services/verifyDeleteRecipe');

module.exports = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const data = await verifyDeleteRecipe(id);
    if (data.code === 'notFound') return res.status(status.notFound).json(data.err);

    return res.status(204).json(data);  
  } catch (error) {
    return res.status(status.serverRrror).json({ message: error.message });
  }
};
