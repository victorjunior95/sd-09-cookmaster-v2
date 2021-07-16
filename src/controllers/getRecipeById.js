const status = require('../api/status');
const findRecipeService = require('../services/findRecipeService');

module.exports = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const data = await findRecipeService(id);
    console.log(data);
    if (data.code === 'notFound') return res.status(status.notFound).json(data.err);
  
    return res.status(status.ok).json(data);
  } catch (error) {
    return res.status(status.serverRrror).json({ message: error.message });
  }
};
