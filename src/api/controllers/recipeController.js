const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../config/multerConfig');
const upload = multer({storage});
const path = require('path');

const recipeModel = require('../models/recipeModel');
const {status, message} = require('../services/statusAndMessages');
const authService = require('../services/authService');
const recipeService = require('../services/recipeService');
const {recipeCheck, recipeGetByIdCheck} = recipeService;

router.put('/:id/image', authService, upload.single('image'), async(req, res) => {
  const {id} = req.params;
  // const {path} = req.file;
  const url = `localhost:3000/src/uploads/${id}.jpeg`;
  // console.log(url);
  await recipeModel.addImage(id, url);
  const result = await recipeModel.getByIdRecipe(id);
  console.log(result);
  res.status(status.OK).json(result);
});

router.post('/', authService, recipeCheck, async (req, res) => {
  try {
    const {name, ingredients, preparation} = req.body;
    // console.log(req.user);
    const userId = req.user._id;
    const result = await recipeModel
      .addRecipe(userId, name, ingredients, preparation);
    res.status(status.CREATED).json({recipe: result});
    
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

router.get('/:id', recipeGetByIdCheck, async(req, res) => {
  try {
    console.log('teste');
    result = req.recipe;
    console.log(result);
    res.status(status.OK).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

router.get('/', async(req, res) => {
  try {
    const result = await recipeModel.getAllRecipe();
    res.status(status.OK).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

router.put('/:id',authService, recipeGetByIdCheck, async(req, res) => {
  try {
    console.log('teste');
    const { id } = req.params;
    const userId = req.user._id;
    const recipe = req.body;
    const result = await recipeModel.updateRecipe(id, recipe, userId);
    console.log(result);
    res.status(status.OK).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

router.delete('/:id',authService, recipeGetByIdCheck, async(req, res) => {
  try {
    const {id} = req.params;
    console.log('teste');
    result = await recipeModel.deleteRecipe(id);    
    res.status(status.NO_CONTENT).send();
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = router;