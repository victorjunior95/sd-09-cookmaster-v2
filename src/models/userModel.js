const getConnection = require('./connection');

async function create({ name, email, password, role }) {
  const userCollection = await getConnection('users');
  const { insertedId } = await userCollection.insertOne({
    name,
    email,
    password,
    role,
  });
  return {
      _id: insertedId,
      name,
      email,
      role,
  };
}

async function findByEmail(email) {
  const userCollection = await getConnection('users');
  const user = await userCollection.findOne({ email });
  return user;
}

module.exports = {
  create,
  findByEmail,
};
