const { ObjectId } = require('mongodb');

const {
  addrecipie,
  getall,
  getone,
  editrecipe,
  delrecipe,
  insertimag, 
} = require('../models/recipesModel');

// mensagens a retornar em caso de falha
const notfound = { message: 'recipe not found' };
// const notToken = {message: 'missing auth token'};
const entries = { message: 'Invalid entries. Try again.' };

// sem numeros magicos eslint
const ii = 2;
const i = 1;
const nameValid = (req, res, next) => {
  if (!req.body.name) { return entries; }
  if (req.body.name.length < ii) { return entries; }
  next();
};

const validarecipies = async (body, user) => {
  const { _id } = user;
  if (!body.ingredients) { return entries; } 
  if (body.ingredients.length < i) { return entries; } 
  if (!body.preparation) { return entries; } 
  if (body.preparation.length < i) { return entries; } 
    const recipeAdded = await addrecipie(body, _id);
    return recipeAdded;
};

const getAllrecipies = async () => {
  const a = await getall();
  return a;
};

const getOneRecipe = async (_id) => {
  if (!ObjectId.isValid(_id)) {
    return notfound;
  }
  
  const res = await getone(_id);
  if (!res) { return notfound; } return res;
};

const editvlidation = async (id, body) => {
  const result = await Promise.all([editrecipe(id, body)]);
  return result[0];
};

const deletevalidation = async (id) => {
  const result = await delrecipe(id);
  return result;
};

const imagvalidation = async (id, path) => {
  const result = await Promise.all([insertimag(id, path)]);
  return result[0];
};

module.exports = {
  
  validarecipies,
  getAllrecipies,
  getOneRecipe,
  editvlidation,
  deletevalidation,
  imagvalidation,
  nameValid,
};