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
      id: insertedId,
      name,
      email,
      role,
  };
}

async function findByEmail(email) {
  const userCollection = await getConnection('users');
  const user = await userCollection.findOne({ email });
  if (!user) return;
  const id = '_id';
  return {
    id: user[id],
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  };
}

module.exports = {
  create,
  findByEmail,
};
