const express = require('express');

const router = express.Router();
// const { ObjectId } = require('mongodb');
const multer = require('multer');
const validatejwt = require('../api/auth/validateJWT');

const {
  validarecipies,
  getAllrecipies,
  getOneRecipe,
  editvlidation,
  deletevalidation,
  imagvalidation,
  nameValid,
} = require('../services/recipesService');

const cc = 200;
const cci = 201;
const cciv = 204;
const cd = 400;
const cdi = 401;
const cdiv = 404;

router.post('/', validatejwt, nameValid, async (req, res) => {
  const result = await validarecipies(req.body, req.user);
  let dinamic = result.message ? cd : cdi;
  if (result.recipe) { dinamic = cci; }  
  res.status(dinamic).send(result);
});

router.get('/', async (req, res) => {
  const recipiesList = await getAllrecipies(); // all
  // dinamic = recipiesList?cc:cdi;
  res.status(cc).send(recipiesList);
});

router.get('/:id', async (req, res) => {
  const recipe = await getOneRecipe(req.params.id);
  const dinamic = recipe.message ? cdiv : cc;
  return res.status(dinamic).send(recipe);
});

router.put('/:id', validatejwt, async (req, res) => {
  const editRecipe = await editvlidation(req.params.id, req.body);
  res.status(cc).send(editRecipe);
});

router.delete('/:id', validatejwt, async (req, res) => {
  const deleteRecipe = await deletevalidation(req.params.id);
  res.status(cciv).send(deleteRecipe);
});

// parametros / opções do multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, './src/uploads'); },
  
  filename: (req, file, callback) => {
    const split = file.originalname.split('.');   
    callback(null, `${req.params.id}.${split[1].replace('jpg', 'jpeg')}`);
  },
});
const upload = multer({ storage });

router.put('/:id/image', validatejwt, upload.single('image'), async (req, res) => {
  const uploadimg = await imagvalidation(req.params.id, req.file.path); 
  res.status(cc).send(uploadimg);
});

module.exports = router;