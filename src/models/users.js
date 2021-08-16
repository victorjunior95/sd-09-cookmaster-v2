const connection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });

  return newUser.ops[0];
};

const getAllUsers = async () => {
  const db = await connection();
  const allUsers = await db.collection('users').find().toArray();

  return allUsers;
};

const findUser = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user;
};

const createAdmin = async (name, email, password, role) => {
  const db = await connection();
  const newAdmin = await db.collection('users').insertOne({ name, email, password, role });

  return newAdmin.ops[0];
};

module.exports = {
  create,
  getAllUsers,
  findUser,
  createAdmin,
};