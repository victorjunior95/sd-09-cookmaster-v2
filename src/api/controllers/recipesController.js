const recipesService = require('../services/recipesService');
const erros = require('../utils/codigosErro');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { user } = req;
  if (!name || !ingredients || !preparation) { 
    return res.status(erros.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' }); 
  }
  const create = await recipesService.createRecipe(name, ingredients, preparation, user.id);
  res.status(erros.CREATED).json(create);
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  res.status(erros.OK).json(recipes);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipesService.findById(id);
  if (!recipes) {
    res.status(erros.NOT_FOUND).json({ message: 'recipe not found' });
  } else { 
    res.status(erros.OK).json(recipes);
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const update = await recipesService.updateOne(id, name, ingredients, preparation);

  res.status(erros.OK).json(update);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const del = await recipesService.deleteRecipe(id);
  res.status(erros.NO_CONTENT).json(del);
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const image = `localhost:3000/${path}`;
    const result = await recipesService.addImage(id, image);
    res.status(erros.OK).json(result);
  } catch (err) {
    res.status(erros.BAD_REQUEST).json({ message: 'upload failed' });
  }
};

module.exports = {
  createRecipe,
  getAll,
  findById,
  updateOne,
  deleteRecipe,
  addImage,
}; 