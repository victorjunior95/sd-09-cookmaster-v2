const connection = require('./connection');

const getUser = async (email) => {
  const user = await connection()
  .then((db) => db.collection('users').findOne({ email }));

  return user;
};

const addUser = async (name, email, password, role) => {
  const emailAlreadyExists = await getUser(email);

  if (emailAlreadyExists) return null;

  const response = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));

  const [user] = response.ops;

  return user;
};

module.exports = {
  addUser,
  getUser,
};
