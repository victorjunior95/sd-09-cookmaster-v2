const status = require('../api/status');
const verifyNewRecipe = require('../services/verifyNewRecipe');

module.exports = async (req, res, _next) => {
  try {
    const { _id } = req.user;
    const recipe = await verifyNewRecipe(req.body, _id);
    console.log(recipe);
    if (recipe.code === 'bad_request') return res.status(status.badRequest).json(recipe.err);
    
    return res.status(status.created).json({ recipe });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
