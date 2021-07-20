const { ObjectId } = require('mongodb');
const connection = require('./connection');

const find = async (id) => {
  if (id === undefined) {
    const i = await connection().then((db) => db.collection('users').find().toArray());
    return i;
  }
  const obj = await connection().then((db) => db.collection('users').find({
    _id: ObjectId(id),
  }).toArray());

  return obj[0];
};

const findByEmail = async (email) => {
  if (email === undefined) return null;
  const array = await connection().then((db) => db.collection('users').find({
    email,
  }).toArray());

  return array;
};

const create = async (name, email, password, role) => {
  const products = await connection().then((db) => db.collection('users').insertOne(
    {
      name,
      email,
      password,
      role,
    },
    ));

  return products.ops[0];
};

const exlude = async (id) => {
  const result = await connection().then((db) => db.collection('users').deleteOne({
    _id: ObjectId(id),
  }));
  if (result.deletedCount === 1) {
    return id;
  }
  return ({ message: 'Não foi possivel excluir' });
};

const update = async (id, name, quantity) => {
  const result = await connection().then((db) => db.collection('users').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set:
        {
          name,
          quantity,
        },
    },
    ));

  if (result.modifiedCount === 1) {
    return ({ id, name, quantity });
  }
  return ({ message: 'Não foi possivel editar' });
};

const updateQuantity = async (id, quantity) => {
  const result = await connection().then((db) => db.collection('products').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $inc:
        {
          quantity: -quantity,
        },
    },
    ));
  if (result.modifiedCount === 1) {
    return id;
  }
  return ({ message: 'Não foi possivel editar' });
};
module.exports = {
  find,
  create,
  update,
  exlude,
  updateQuantity,
  findByEmail,
};