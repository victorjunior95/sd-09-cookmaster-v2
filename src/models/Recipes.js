const connection = require('./connection');

const response = (user, code) => ({ result: { user }, code });

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({
      Nome: name,
      Ingredientes: ingredients,
      'Modo de preparo': preparation,
      'Id do Autor': userId,
    }))
    .then((data) => { 
      const recipe = { name, ingredients, preparation, userId, _id: data.insertedId };
      return response(recipe, 201);
    });
  return result;
};

module.exports = { createRecipe };