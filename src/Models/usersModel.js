const connection = require('./connection');

const userCreate = async (email, name, password) => {
  const user = await connection().then((db) =>
    db.collection('users')
      .insertOne({ email, name, password, role: 'user' }));
  const { password: passBD, ...userWithoutPassword } = user.ops[0];
  return userWithoutPassword;
};

const getOne = async (email) => {
  const users = await connection().then((db) => db.collection('users')
    .findOne({ email }).then((user) => user));

  return users;
};

module.exports = {
  userCreate,
  getOne,
};