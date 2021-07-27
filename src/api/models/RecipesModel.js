const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createRecipe({ name, ingredients, preparation, userId }) {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = recipes.ops[0];
  const { password: _, ...recipe } = result;
  return { recipe };
}

async function findAll() {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

async function findRecipe(id) {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
}

async function updateOne(id, name, ingredients, preparation) {
  console.log(name, ingredients, preparation);
  const db = await connection();
  const recipe = await db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) }, 
      { 
        $set: { 
          name, ingredients, preparation, 
        }, 
      },
    );
  // console.log(recipe);
  return recipe;
}

module.exports = {
  createRecipe,
  findAll,
  findRecipe,
  updateOne,
};