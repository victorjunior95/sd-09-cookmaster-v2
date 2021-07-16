const multer = require('multer');
const RecipesServices = require('../services/RecipesServices');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'src/uploads/'); },
  filename: (req, _file, callback) => { callback(null, `${req.params.idRecipe}.jpeg`); },
  filter: (_req, file, callback) => {
    if (file.mimetipe !== 'image/jpeg') { callback(null, false); } else callback(null, true);
  },
});
const upload = multer({ storage });

const imageValidatorUserWillUpdate = async (req, _res, next) => {
  const { id, role } = req.body;
  const { idRecipe } = req.params;
  const dataRecipe = await RecipesServices.recipeVerifierUser(id, idRecipe, role);
  if (dataRecipe.error) { return next(dataRecipe); }
  return next();
};

const putImage = async (req, res, next) => {
  const { path } = req.file;
  const { idRecipe } = req.params;
  const image = `localhost:3000/${path}`;

  await RecipesServices.recipeUpdateAddImage(idRecipe, image);

  const recipe = await RecipesServices.recipesGetOne(idRecipe);
  if (recipe.error) { return next(recipe); }
  return res.status(200).json(recipe);
};

const getRecipeImage = async (req, res, next) => {
  const { idRecipe } = req.params;
  const recipeSliced = idRecipe.slice(0, -5);
  const data = await RecipesServices.recipesGetOne(recipeSliced);
  if (data.error) { return next(data); }
  const dataImage = RecipesServices.recipeGetImagePath(recipeSliced);
  if (dataImage.error) { return next(dataImage); }
  return res.status(200).sendFile(dataImage);
};

module.exports = { upload, imageValidatorUserWillUpdate, putImage, getRecipeImage };
