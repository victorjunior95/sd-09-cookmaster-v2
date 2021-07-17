const status = require('../statuscode/status');
const recipesServices = require('../services/recipesServices');

const createRecipes = async (req, res) => {
  const userId = req.user;
  const { name, ingredients, preparation } = req.body;

  try {
    const result = await recipesServices.createRecipes(
      name,
      ingredients,
      preparation,
      userId,
    );
    res.status(status.CREATE).json({ recipe: result });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ messagem: err.messagem });
  }
};

module.exports = {
  createRecipes,
};