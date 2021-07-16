const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (recipeInfo) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeInfo }));

  return result.insertedId;
};

const postNewRecipe = async (recipeInfo) => {
  const result = await insertRecipe(recipeInfo);

  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find({}).toArray());
  return result;
};

const getRecipeById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((error) => ({ error: error.message }));
  if (result === null || !result.name) return ({ code: 404, message: 'recipe not found' });

  return result;
};

const checkOwnership = async ({ id, userId, role }) => {
  const myRecipe = await getRecipeById(id);
  // se não tem name é um error de not found
  if (!myRecipe.name) return myRecipe;

  // se não for o dono nem admin, não deixa fazer nada
  if (myRecipe.userId.toString() !== userId.toString() && role !== 'admin') {
    return { code: 401, message: 'Unauthorized' };
  }

return myRecipe;
};

const updateRecipe = async (data) => {
  const { id, userId, role } = data;

  const checkedRecipe = await checkOwnership({ id, userId, role });

  if (!checkedRecipe.name) return checkedRecipe;

  const { name, ingredients, preparation } = data;

  const { modifiedCount } = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  return { modifiedCount };
};

const deleteRecipe = async (data) => {
  const checkedRecipe = await checkOwnership(data);

  if (!checkedRecipe.name) return checkedRecipe;

  const { id } = data;
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
return {};
};

const postRecipeImage = async (id) => {
  const imagePath = `localhost:3000/src/uploads/${id}.jpeg`;
  const { modifiedCount } = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } }));

  if (modifiedCount === 1) {
    const myRecipe = await getRecipeById(id);
    return myRecipe;
  }

  return { code: 400, message: 'Não houve mudança no path da imagem' };
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  checkOwnership,
  postRecipeImage,
};