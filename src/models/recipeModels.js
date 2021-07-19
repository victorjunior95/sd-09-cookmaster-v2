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

const deleteRecipeModel = async (id) => {
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) }));
  return request;
};

const uploadPictureModel = async (id) => {
  const imagePath = `localhost:3000/src/uploads/${id}.jpeg`;
  const { modifiedCount } = await connection().then((db) => 
  db.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) }, 
    { $set: { image: imagePath } },
));

  if (modifiedCount === 1) {
    const myRecipe = await getRecipeByIdModel(id);
    return myRecipe;
}

  return { message: 'Same path' };
};

module.exports = {
  postRecipeModel,
  getAllRecipeModel,
  getRecipeByIdModel,
  editRecipeModel,
  deleteRecipeModel,
  uploadPictureModel,
};