// const upload = require('../middlewares/upload');
// const path = require('path');
const multer = require('multer');
// const fs = require('fs').promises;

const recipesService = require('../services/recipesService');

const createRecipe = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const recipe = { ...req.body, userId };

    const createResult = await recipesService.createRecipe(recipe);

    return res.status(createResult.status).json({ recipe: createResult.result });
  } catch (err) {
    console.log({ error: err.message });
    return next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const searchResult = await recipesService.findAll();

    return res.status(searchResult.status).json(searchResult.result);
  } catch (err) {
    console.log({ error: err.message });
    return next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const searchResult = await recipesService.findById(id);

    if (searchResult.message) {
      return res.status(searchResult.status).json({ message: searchResult.message });
    }

    return res.status(searchResult.status).json(searchResult.result);
  } catch (err) {
    console.log({ error: err.message });
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const recipe = req.body;
    const userData = req.user;
    const { id } = req.params;

    const { status, result } = await recipesService.update(id, recipe, userData);

    return res.status(status).json(result);
  } catch (err) {
    console.log({ error: err.message });
    return next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const userData = req.user;
    const { id } = req.params;

    const result = await recipesService.deleteRecipe(id, userData);

    return res.status(result.status).json();
  } catch (err) {
    console.log('[Error recipesController] > ', err.message);
    return next(err);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { file, user } = req;
      const { id } = req.params;

      const { status, result } = await recipesService.addImageToRecipe(id, user, file);
      return res.status(status).json(result);
    } catch (err) {
      // console.log({ error: err.message });
      return next(err);
    }
  },
];

module.exports = {
  createRecipe,
  findAll,
  findById,
  update,
  deleteRecipe,
  uploadImage,
};
