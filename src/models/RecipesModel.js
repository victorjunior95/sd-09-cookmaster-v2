const connection = require('./connection');

const addRecipe = async (recipeObject) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeObject));
  return recipe.ops[0];
};

const findAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const findOneRecipe = async (recipeObject) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(recipeObject));
  return recipe;
};

const updateOneRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: id },
      { $set: { name, ingredients, preparation } },
      { upsert: true },
    ))
    .then(() => ({ _id: id, name, ingredients, preparation }));
  return recipe;
};

const updateRecipeAddImage = async (id, image) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: id },
      { $set: { image } },
      { upsert: true },
    ))
    .then((result) => result.value);
  return recipe;
};

const deleteOneRecipe = async (recipeObject) => {
  const recipe = await findOneRecipe(recipeObject);
  if (!recipe) return { error: 'recipe not found' };
  await connection().then((db) => db.collection('recipes').deleteOne(recipeObject));
  return { success: 'recipe deleted' };
};

module.exports = {
  addRecipe,
  findAllRecipes,
  findOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  updateRecipeAddImage,
}; 
