const { Router } = require('express');
// const multer = require('multer');
const modelsRecipes = require('../models/Recipes');
const { validateToken } = require('../services/tokenValidate');
const { checkRecipesData } = require('../middlewares');
const userSchemas = require('../schemas');

const Created = '201';
const Unauthorized = '401';
const OK = '200';
const NotFound = '404';
// const NotContent = '204';

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'src/uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, `${req.params.id}.jpeg`);
//   },
//   path: (req, file, callback) => {
//     callback(null);
//   },
// });

// const upload = multer({ storage });
const recipesController = Router();

recipesController.post('/', checkRecipesData(userSchemas), async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const valid = validateToken(token);
  if (!valid) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const recipe = await modelsRecipes.create(name, ingredients, preparation, valid.idToken);
  res.status(Created).json({ recipe: recipe.ops[0] });
});

recipesController.get('/', async (_req, res) => {
  const recipes = await modelsRecipes.getAll();
  res.status(OK).send(recipes);
});

recipesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await modelsRecipes.getById(id);
  if (!recipe) return res.status(NotFound).json({ message: 'recipe not found' });
  res.status(OK).json(recipe);
});

recipesController.put('/:id', checkRecipesData(userSchemas), async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  let result = '';
  const valid = validateToken(token);
  // console.log(valid);
  // // eslint-disable-next-line no-underscore-dangle
  // const { idToken } = valid.idToken;

  if (valid.idToken || valid.role === 'admin') {
    const recipe = await modelsRecipes.update(id, name, ingredients, preparation);
    if (recipe.result.ok) result = await modelsRecipes.getById(id);
  }
  res.status(OK).json(result);
});

// recipesController.delete('/:id', checkToken, async (req, res) => {
//   const { id } = req.params;
//   const recipe = await modelsRecipes.getById(id);
//   if (valid._id === recipe.userId || valid.role === 'admin') {
//     const response = await modelsRecipes.del(id);
//     response.result.ok
//       ? res.status(No_Content).end()
//       : res.status(Unauthorized).json({ message: msgMissingToken });
//   } else return res.status(Unauthorized).json({ message: msgMissingToken });
// });

// recipesController.put('/:id/image', upload.single('image'), async (req, res) => {
//   const { id } = req.params;
//   const token = req.headers.authorization;
//   // if (!token)
//   //   return res.status(Unauthorized).json({ message: msgMissingToken });
//   // const valid = validateToken(token);
//   // if (!valid)
//   //   return res.status(Unauthorized).json({ message: msgJWTMalformed });
//   // const recipe = await modelsRecipes.getById(id);
//   if (valid._id === recipe.userId || valid.role === 'admin') {
//     const image = `localhost:3000/src/uploads/${id}.jpeg`;
//     const recipeimg = await modelsRecipes.addImage(id, image);
//     recipeimg.result.ok ? (result = await modelsRecipes.getById(id)) : '';
//   }
//   res.status(OK).json(result);
// });

module.exports = recipesController;
