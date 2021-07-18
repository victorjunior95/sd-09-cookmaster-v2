const connection = require('./connections');

const findEmail = async (searchEmail) => {
  return await connection()
    .then((db) => db.collection('users').findOne({ email: searchEmail }));
};

const createUser = async (user) => {
  const userData = { ...user, role: 'user' };
  const { password, ...result } = userData;

  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(userData));

  return { ...result, _id: insertedId };
}

module.exports = {
  createUser,
  findEmail,
};
