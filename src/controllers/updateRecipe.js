const status = require('../api/status');
const verifyUpdateRecipe = require('../services/verifyUpdateRecipe');

module.exports = async (req, res, _next) => { 
  try {
    const { id } = req.params; 
    const userId = req.user['_id'];
    const data = await verifyUpdateRecipe(id, userId, req.body);

    return res.status(status.ok).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
