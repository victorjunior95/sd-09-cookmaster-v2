const connections = require('./connections');

const createUser = async (user) => {
  const userData = { ...user, role: 'user' };
  const { insertedId } = await connections()
    .then((db) => db.collection('users').insertOne(userData));

  return { ...userData, _id: insertedId };
}

module.exports = {
  createUser,
};
