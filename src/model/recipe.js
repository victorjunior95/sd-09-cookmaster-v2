const { ObjectId } = require('mongodb');
const connection = require('../other/connection');

const RECIPES = 'recipes';

const newRecipeModel = async (newRecipe) => {
  const db = await connection();
  const createdRecipe = await db.collection(RECIPES).insertOne(newRecipe);
  return createdRecipe.ops[0];
};

const listRecipesModel = async () => {
  const db = await connection();
  const recipes = await db.collection(RECIPES).find().toArray();
  return recipes;
};

const recipeByIdModel = async (id) => {
  /* Pego do meu projeto do Store Manager */
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection(RECIPES).findOne(ObjectId(id));
  return recipe;
};

module.exports = {
  newRecipeModel,
  listRecipesModel,
  recipeByIdModel,
};

  // console.log(`created recipe de model ${createdRecipe}`);
/* {"result":{"n":1,"ok":1},"connection":{"_events":{},"_eventsCount":4,"id":1,"address":"127.0.0.1:27017","bson":{},"socketTimeout":360000,"monitorCommands":false,"closed":false,"destroyed":false,"lastIsMasterMS":5},"ops":[{"name":"receita correta","ingredients":"Frango e arroz","preparation":"cozinhar até focar ","userId":"60fc67aab81e805564ae87ca","_id":"60fc6b5c46879f590b5d1a70"}],"insertedCount":1,"insertedId":"60fc6b5c46879f590b5d1a70","n":1,"ok":1} */
