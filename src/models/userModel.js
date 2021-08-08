const connection = require('./connection');

const COLLECTION = 'users';

const findByEmail = async (email) => {
  const usersCollection = await connection().then((db) => db.collection(COLLECTION));

  return usersCollection.findOne({ email });
};

const addUser = async (userData) => {
  const role = 'user';

  const usersCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await usersCollection.insertOne({ ...userData, role });

  return { user: { _id, role, ...userData } };
};

const findUser = async (userData) => {
  const usersCollection = await connection().then((db) => db.collection(COLLECTION));

  return usersCollection.findOne({ ...userData });
};

const addAdmin = async (adminData) => {
  const role = 'admin';

  const usersCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await usersCollection.insertOne({ ...adminData, role });

  return { user: { _id, role, ...adminData } };
};

module.exports = {
  addUser,
  findByEmail,
  findUser,
  addAdmin,
};
