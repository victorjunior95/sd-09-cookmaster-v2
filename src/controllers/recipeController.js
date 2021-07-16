const recipeModel = require('../models/recipeModel');
const status = require('../status/httpCodes');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;

    const result = await recipeModel.createRecipe(
      name, ingredients, preparation, userId,
);

    res.status(status.CREATED).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim!' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const result = await recipeModel.getAllRecipes();

    return res.status(status.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Nenhuma receita encontrada' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeModel.getRecipeById(id);

    return res.status(status.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.NOT_FOUND).json({ message: status.NOT_FOUND_MESSAGE });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const entries = req.body;
    const userId = req.user._id;
    const { id } = req.params;
    const result = await recipeModel.updateRecipe(id, entries, userId);

    return res.status(status.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Não foi possivel atualizar esta receita' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipeModel.deleteRecipe(id);

    return res.status(status.NOT_CONTENT).json();
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'It wasnt possible to delete this recipe.' });
  }
};

const uploadRecipeImg = async (id, path) => recipeModel.uploadImg(id, path);

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const imgPath = `localhost:3000/${path}`;
    const result = await uploadRecipeImg(id, imgPath);

    return res.status(status.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim na imagem!' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
