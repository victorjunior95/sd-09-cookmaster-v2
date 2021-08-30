const recipesService = require('../services/recipesService');
const erros = require('../utils/codigosErro');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;
  const userId = _id; // linha adicionada para o userId aparecer na resposta da requisição
  if (!name || !ingredients || !preparation) { 
    return res.status(erros.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' }); 
  }
  const create = await recipesService.createRecipe(name, ingredients, preparation, userId);
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
  const { user } = req; // desestruturado para pegar a propriedade role na linha 39
  const { _id } = req.user; // segunda desestruturacao no mesmo objeto req, pois lint nao permite usar o _id
  const userId = _id; // então criamos um novo nome para o _id e depois passamos
  const recipe = await recipesService.findById(id);
  const update = await recipesService.updateOne(id, name, ingredients, preparation);
  if (!userId.equals(recipe.userId) && user.role !== 'admin') {
    res.status(erros.UNAUTHORIZED).json({ message: 'Invalid entries. Try again.' });
  } else {
  // console.log(user._id.equals(recipe.userId)); Proibido pelo lint, por isso fazemos a linha 35 e 36 e usamos o:
  // console.log(userId.equals(recipe.userId));
  // console.log(recipe.userId);
  res.status(erros.OK).json(update);
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { _id } = req.user;
  const userId = _id;
  const recipe = await recipesService.findById(id);
  const del = await recipesService.deleteRecipe(id);
  if (!userId.equals(recipe.userId) && user.role !== 'admin') {
    res.status(erros.UNAUTHORIZED).json({ message: 'Invalid entries. Try again.' });
  } else {
  res.status(erros.NO_CONTENT).json(del);
  }
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const image = `localhost:3000/${path}`;
    const { user } = req;
    const { _id } = req.user;
    const userId = _id;
    const recipe = await recipesService.findById(id);
    const result = await recipesService.addImage(id, image);
    if (!userId.equals(recipe.userId) && user.role !== 'admin') {
      res.status(erros.UNAUTHORIZED).json({ message: 'Invalid entries. Try again.' });
    } else {
    res.status(erros.OK).json(result);
    }
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