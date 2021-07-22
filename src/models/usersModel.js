const connection = require('./connection');

const coll = 'users';

const getByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection(coll).findOne({ email }));

  return user;
};

const add = async (name, email, password, role) => {
  const emailAlreadyExists = await getByEmail(email);

  if (emailAlreadyExists) return null;

  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, email, password, role }));

  const [user] = response.ops;

  return user;
};

const addAdmin = async (name, email, password) => {
  const role = 'admin';
  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, email, password, role }));

  const [admin] = response.ops;

  return admin;
};

module.exports = {
  add,
  getByEmail,
  addAdmin,
};
