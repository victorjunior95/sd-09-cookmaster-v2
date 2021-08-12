const recipesService = require('../service/recipesService');

const verifyReq = (name, ingredients, preparation) => {
  const params = [name, ingredients, preparation];
  let res = null;

  params.forEach((param) => {
    if (typeof param !== 'string') res = { message: 'Invalid entries. Try again.' };
  });

  return res;
};

const postRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const invalidEntries = verifyReq(name, ingredients, preparation);

  if (invalidEntries) {
    return res.status(400).json(invalidEntries);
  }

  const newRecipe = await recipesService.postRecipes(name, ingredients, preparation, user);
  return res.status(201).json(newRecipe);
};

module.exports = { postRecipes };
