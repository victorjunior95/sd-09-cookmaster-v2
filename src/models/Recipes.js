const { ObjectID } = require('mongodb');
const connection = require('./connection');

const response = (recipe, code) => ({ result: recipe, code });

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }))
    .then((data) => { 
      const recipe = { name, ingredients, preparation, userId, _id: data.insertedId };
      return response({ recipe }, 201);
    });
  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => response(recipes, 200));
  return result;
};

const getRecipeById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectID(id)))
    .then((recipe) => response(recipe, 200));
  return result;
};

const editRecipe = async (userId, { id, name, ingredients, preparation }) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation } }))
    .then(() => response({ _id: id, name, ingredients, preparation, userId }, 200));
  return result;
};

const deleteRecipe = async (recipeId, userID, role) => {
  const query = role === 'admin' 
    ? { _id: ObjectID(recipeId), userId: userID } 
    : { _id: ObjectID(recipeId) };

  const result = await connection()
    .then((db) => db.collection('recipes').deleteOne(query))
    .then(() => response(null, 204));
  return result;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe };