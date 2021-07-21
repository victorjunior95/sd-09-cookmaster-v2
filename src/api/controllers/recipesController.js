const recipesServeci = require('../service/recipesService');

const postNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const recipe = await recipesServeci.postNewRecipe({ name, ingredients, preparation });

  return res.status(201).send({
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: recipe.insertedId,
    },
  });
};

module.exports = { postNewRecipe };