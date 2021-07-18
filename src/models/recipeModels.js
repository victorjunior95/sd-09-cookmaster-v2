const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'recipes';

const postRecipeModel = async (data) => {
  const { user, body } = data;
  const { _id } = user;
  const recipeData = { userId: _id, ...body };
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).insertOne(recipeData));

  return { recipe: request.ops[0] };
};

const getAllRecipeModel = async () => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).find().toArray());
  return request;
};

const getRecipeByIdModel = async (id) => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) }));
  return request;
};

const editRecipeModel = async (id, data) => {
  const response = { _id: id, ...data };
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).updateOne({ _id: ObjectId(id) }, 
      { $set: 
        { userId: data.userId, 
          name: data.name, 
          ingredients: data.ingredients, 
          preparation: data.preparation }, 
        }).then(() => response));
  return request;
};

module.exports = {
  postRecipeModel,
  getAllRecipeModel,
  getRecipeByIdModel,
  editRecipeModel,
};