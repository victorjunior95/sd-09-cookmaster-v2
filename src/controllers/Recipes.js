const modelsRecipes = require('../models/Recipes');
const { validateToken } = require('../services/tokenValidate');
const { checkRecipesData } = require('../middlewares');
const userSchemas = require('../schemas');
const multer = require('multer');
const Created = '201';
const Unauthorized = '401';
const OK = '200';
const Not_Found = '404';
const No_Content = '204';
const msgMissingToken = 'missing auth token';
const msgJWTMalformed = 'jwt malformed';

const { Router } = require('express');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
  path: (req, file, callback) => {
    callback(null);
  },
});

const upload = multer({ storage });
const recipesController = Router();

recipesController.post('/', checkRecipesData(userSchemas), async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(Unauthorized).json({ message: msgJWTMalformed });
  const valid = validateToken(token);
  if (!valid) return res.status(Unauthorized).json({ message: msgJWTMalformed });
  const recipe = await modelsRecipes.create(name, ingredients, preparation, valid._id);
  res.status(Created).json({ recipe: recipe.ops[0] });
});

recipesController.get('/', async (_req, res) => {
  const recipes = await modelsRecipes.getAll();
  res.status(OK).send(recipes);
});

recipesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await modelsRecipes.getById(id);
  if (!recipe) return res.status(Not_Found).json({ message: 'recipe not found' });
  res.status(OK).json(recipe);
});

recipesController.put('/:id', checkRecipesData(userSchemas), async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token)
    return res.status(Unauthorized).json({ message: msgMissingToken });
  const valid = validateToken(token);
  if (!valid)
    return res.status(Unauthorized).json({ message: msgJWTMalformed });
  if (valid._id || valid.role === 'admin') {
    const recipe = await modelsRecipes.update(id, name, ingredients, preparation);
    recipe.result.ok ? (result = await modelsRecipes.getById(id)) : '';
  }
  res.status(OK).json(result);
});

recipesController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token)
    return res.status(Unauthorized).json({ message: msgMissingToken });
  const valid = validateToken(token);
  if (!valid)
    return res.status(Unauthorized).json({ message: msgJWTMalformed });
  const recipe = await modelsRecipes.getById(id);
  if (valid._id === recipe.userId || valid.role === 'admin') {
    const response = await modelsRecipes.del(id);
    response.result.ok
      ? res.status(No_Content).end()
      : res.status(Unauthorized).json({ message: msgMissingToken });
  } else return res.status(Unauthorized).json({ message: msgMissingToken });
});

recipesController.put('/:id/image', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token)
    return res.status(Unauthorized).json({ message: msgMissingToken });
  const valid = validateToken(token);
  if (!valid)
    return res.status(Unauthorized).json({ message: msgJWTMalformed });
  const recipe = await modelsRecipes.getById(id);
  if (valid._id === recipe.userId || valid.role === 'admin') {
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    const recipeimg = await modelsRecipes.addImage(id, image);
    recipeimg.result.ok ? (result = await modelsRecipes.getById(id)) : '';
  }
  res.status(OK).json(result);
});

module.exports = recipesController;
