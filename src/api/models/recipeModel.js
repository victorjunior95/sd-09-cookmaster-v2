const connect = require('./connection');
const {ObjectId} = require('mongodb');

const addImage =async(id, url) => {
  if (!ObjectId.isValid(id)) return null;
  connect().then(async(db) => {
    const result = await db.collection('recipes')
      .updateOne({_id:ObjectId(id)}, {$set: {image: url}});
    return result;
  });
};

const addRecipe = async(userId, name, ingredients, preparation) =>
  connect().then(async(db) => {
    const result = await db.collection('recipes')
      .insertOne({userId, name, ingredients, preparation});
    return result.ops[0];
  });

const getAllRecipe = async() =>
  connect().then(async(db) => {
    const result = await db.collection('recipes').find().toArray();
    return result;
  });

const getByIdRecipe = async(id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = connect().then(async(db) => 
    await db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const updateRecipe = async(id, recipe, userId) => {
  const {name, ingredients, preparation} = recipe;
  console.log('result');
  if (!ObjectId.isValid(id)) return null;
  const result = connect().then(async(db) =>
    await db.collection('recipes')
      .updateOne({_id: ObjectId(id)}, {$set: {name, ingredients, preparation}}));
  return {_id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async(id) => {
  if (!ObjectId.isValid(id)) return null;
  connect().then(async(db) => {
    const result = await db.collection('recipes').deleteOne({_id:ObjectId(id)});
    return result;
  });
};

module.exports = {addRecipe, getAllRecipe, getByIdRecipe,
  updateRecipe, deleteRecipe, addImage};