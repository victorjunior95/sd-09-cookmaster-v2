const connection = require('./connection');

const coll = 'users';

const getUser = async (email) => {
  const user = await connection()
  .then((db) => db.collection(coll).findOne({ email }));

  return user;
};

const addUser = async (name, email, password, role) => {
  const emailAlreadyExists = await getUser(email);

  if (emailAlreadyExists) return null;

  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, email, password, role }));

  const [user] = response.ops;

  return user;
};

module.exports = {
  addUser,
  getUser,
};
