const recipesService = require('./recipes.service');
const loginService = require('../login/login.service');

const addRecipe = async (req, res) => {
  try {
    const { body, headers: { authorization } } = req;

    const { status, data } = await recipesService.createRecipe(body, authorization);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const listRecipes = async (__, res) => {
  try {
    const { status, data } = await recipesService.listRecipes();

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const getRecipeById = async (req, res) => {
  try {
    const { params: { id } } = req;
    const { status, data } = await recipesService.getRecipeById(id);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const updateRecipeById = async (req, res) => {
  try {
    const { params: { id }, body, headers: { authorization } } = req;
    const { status, data } = await recipesService.updateRecipeById(id, body, authorization);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { params: { id }, headers: { authorization } } = req;
    const { status, data } = await recipesService.deleteRecipeById(id, authorization);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const canEdit = async (req, res, next) => {
  try {
    const { params: { id }, headers: { authorization } } = req;

    const { role, _id } = await loginService.tokenValidator(authorization);

    const permission = recipesService.canEdit(role, _id, id);

    return permission ? next() : res.status(401)
      .json({ message: 'You cannot edit this recipe' });
  } catch (err) { return res.status(400).json(err); }
};

const addImageToRecipe = async (req, res) => {
  try {
    const { id } = req.params;
  
    const { status, data } = await recipesService.addImageToRecipe(id);
  
    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  addRecipe,
  listRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  canEdit,
  addImageToRecipe,
};
