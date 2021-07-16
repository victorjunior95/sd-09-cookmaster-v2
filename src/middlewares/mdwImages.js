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
  console.log('passei de imageValidatorUserWillUpdate');
  return next();
};

const putImage = async (req, res, next) => {
  const { path } = req.file;
  const { idRecipe } = req.params;

  const image = `localhost:3000/${path}`;

  await RecipesServices.recipeUpdateAddImage(idRecipe, image);

  const recipe = await RecipesServices.recipesGetOne(idRecipe);
  console.log(recipe);

  if (recipe.error) { return next(recipe); }
  return res.status(200).json(recipe);
};

module.exports = { upload, imageValidatorUserWillUpdate, putImage };
