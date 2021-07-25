const recipesServices = require('../services/recipesServices');
const validateToken = require('../services/usersServices/validateToken');
const validateEntries = require('../services/recipesServices/validateEntries');

const created = 201;

const insertRecipe = [
  validateToken,
  validateEntries,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user: { _id: userId } } = req;
    const insertedRecipe = await recipesServices.insertRecipe(
      { name,
        ingredients,
        preparation,
        userId,
      },
    );
    return res.status(created).json(insertedRecipe);
  },
];

module.exports = {
  insertRecipe,
};
