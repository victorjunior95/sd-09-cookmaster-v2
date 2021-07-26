const { StatusCodes } = require('http-status-codes');
const recipesService = require('../service/recipeService');

 const createRecipes = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO CRIAR UM RECECIPE');
  try {
    const result = await recipesService.createRecipes(req.body);
  if (result.isError) return res.status(result.status).json(result.err);
  return res.status(StatusCodes.CREATED).json({ recipe: result });
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

 const getRecipes = async (_req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO BUSCAR RECECIPES');
  try {
    const result = await recipesService.getRecipes();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findRecipes = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO BUSCAR UM RECECIPE POR ID');
  try {
    const { id } = req.params;
    const result = await recipesService.findRecipes(id);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateRecipes = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO ATUALIZAR UM RECECIPE');
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesService.updateRecipes(id, name, ingredients, preparation);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteRecipes = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO DELETAR UM RECECIPE');
  try {
    const { id } = req.params;
    const result = await recipesService.deleteRecipes(id);
    return res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const imageUpdate = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO ATUALIZAR UMA IMAGE');
  try {
    const { id } = req.params;
    const result = await recipesService.imageUpdate(id, req.file);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getImage = async (req, res) => {
  console.log('[RECIPE CONTROLLER] : CHAMOU O MÉTODO BUSCAR UMA IMAGE');
  try {
    const { id } = req.params;
    const result = await recipesService.getImage(id);
    return res.status(StatusCodes.OK).sendFile(result.message, { root: __dirname });
  } catch (error) {
    console.log(`[RECIPE CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
 
module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
  getImage,
};