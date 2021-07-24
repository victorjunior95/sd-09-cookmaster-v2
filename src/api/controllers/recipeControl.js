const {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  uploadImageService,
  deleteRecipeByIdService,
} = require('../services/recipeService');

const createRecipesControl = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = await createRecipeService({ name, preparation, ingredients, userId });

  return res.status(201)
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

const getAllRecipesControl = async (_req, res) => {
  const result = await getAllRecipesService();

  return res.status(200).json(result);
};

const getRecipeByIdControl = async (req, res) => {
  const { id } = req.params;
  const result = await getRecipeByIdService(id);

  return res.status(200).json(result);
};

const updateRecipeByIdControl = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  await updateRecipeByIdService(id, name, ingredients, preparation);

  const response = {
    _id: id,
    userId,
    name,
    ingredients,
    preparation,
  };

  return res.status(200).json(response);
};

const deleteRecipeByIdControl = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  await deleteRecipeByIdService(id, userId);

  return res.status(204).json('');
};

const uploadImageControl = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const image = req.file.filename;
  console.log(id);
  const result = await uploadImageService(id, userId, image);

  return res.status(200).json(result);
};

const getImageControl = async (req, res) => {
  const { id } = req.params;
  const recipeId = id.split('.')[0];
  const { image } = await getRecipeByIdService(recipeId);

  return res.status(200).json(image);
};

module.exports = {
  createRecipesControl,
  getAllRecipesControl,
  getRecipeByIdControl,
  updateRecipeByIdControl,
  deleteRecipeByIdControl,
  uploadImageControl,
  getImageControl,
};