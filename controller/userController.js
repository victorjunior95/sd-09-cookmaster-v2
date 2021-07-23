const service = require('../service/usersService');
const upload = require('../service/uploadFile');

const userRegister = async (req, res, next) => {
  try {
    const userData = await service.userRegisterService(req.body);
    if (userData.err) return res.status(404).json(userData);
    return res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const result = await service.loginService(req.body);
    return res.status(200).json({ token: result });
  } catch (error) {
    next(error);
  }
};

const userCreateRecipes = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userId = _id;
    const result = await service.createRecipeService(req.body, userId);
    // const { _id } = req.user;
    // result.recipe.userId = _id;
    
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (_req, res) => {
  const result = await service.allRecipesService();
  if (!result) return res.status(404).json({ message: 'not found' });
  return res.status(200).json(result);
};

const getOneRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await service.getOneRecipeService(id);
  if (!result) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(result);
};

const editOneRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await service.editOneRecipeService(id, req.body, req.user);
  return res.status(200).json(result);
};

const delOneRecipe = async (req, res) => {
  const { id } = req.params;
  await service.delOneRecipeService(id);
  return res.status(204).json();
};

const imageUpload = [upload.single('image'), async (req, res) => {
  const { path } = req.file;
  const { id } = req.params;
  const recipe = await service.uploadService(id, path);
  return res.status(200).json(recipe);
}];

module.exports = {
  userRegister,
  userLogin,
  userCreateRecipes,
  getAllRecipes,
  getOneRecipe,
  editOneRecipe,
  delOneRecipe,
  imageUpload,
};
