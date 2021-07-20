const RecipesService = require('./recipesService');

const create = async (req, res, _next) => {
  console.log(req);
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await RecipesService.create({ name, ingredients, preparation, userId });

  // if (recipe.error) return next(recipe);

  return res.status(201).json({ recipe });
};

// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   const token = await RecipesService.login({ email, password });

//   if (token.error) return next(token);

//   return res.status(200).json({ token });
// };

module.exports = {
  create,
};
