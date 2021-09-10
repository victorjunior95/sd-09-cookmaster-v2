const { ObjectId } = require('mongodb');
const connect = require('./connection');

const register = async (recipe) => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .insertOne(recipe);

  return answer.ops[0];
};

const getAll = async () => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .find().toArray();

  return answer;
};

const getById = async (id) => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .findOne(ObjectId(id));

  return answer;
};

const update = async (id, name, ingredients, preparation) => {
  const connection = await connect();

  const answer = await connection.collection('recipes')
  .updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );

  return answer;
};

const erase = async (id) => {
  const connection = await connect();

  await connection.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const newURL = async (id, image) => {
  const connection = await connect();

  await connection.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image } },
  );
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  erase,
  newURL,
};
