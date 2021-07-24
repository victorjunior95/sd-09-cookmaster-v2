const { create, getAll } = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await create(name, ingredients, preparation, userId);
  // console.log(recipe);
  return res.status(201).json({ recipe });
};

 const getAllRecipes = async (_req, res) => {
   try {
    const recipes = await getAll();
    return res.status(200).json(recipes);
   } catch (error) {
     console.log(error);
   }
};

// getAllRecipes().then((r) => console.log(r));
module.exports = { createRecipes, getAllRecipes };
