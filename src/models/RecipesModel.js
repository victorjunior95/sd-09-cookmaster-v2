const { ObjectId } = require('mongodb');
const connection = require('./connection');

const find = async (id) => {
  if (id === undefined) {
    const i = await connection().then((db) => db.collection('recipes').find().toArray());
    return i;
  }
  const obj = await connection().then((db) => db.collection('recipes').find({
    _id: ObjectId(id),
  }).toArray());

  return obj[0];
};

const create = async (name, ingredients, preparation, userId) => {
  const recié = await connection().then((db) => db.collection('recipes').insertOne(
    {
      name,
      ingredients,
      preparation,
      userId,
    },
    ));
  return recié.insertedId;
};

const exlude = async (id) => {
  console.log(id);
  const result = await connection().then((db) => db.collection('recipes').deleteOne({
    _id: ObjectId(id),
  }));
  if (result.deletedCount === 1) {
    return id;
  }
  return ({ message: 'Não foi possivel excluir' });
};

const update = async (id, name, ingredients, preparation) => {
  const result = await connection().then((db) => db.collection('recipes').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set:
        {
          name,
          ingredients,
          preparation,
        },
    },
));
console.log(result);
  if (result.modifiedCount === 1) return result;
  return ({ message: 'Não foi possivel editar' });
};

const updateImage = async (id, image) => {
  console.log('update');
  const result = await connection().then((db) => db.collection('recipes').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set:
        {
          image,
        },
    },
));
  if (result.modifiedCount === 1) return result;
  return ({ message: 'Não foi possivel editar' });
};

module.exports = {
  find,
  create,
  update,
  exlude,
  updateImage,
};