const connect = require('./connection');

const createUser = async (name, email, password) => {
  // console.log('MODEL createUser req.body', name, email, password);
  const db = await connect();
  const user = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  // console.log('MODEL createUser user', user.ops[0]);
  return user.ops[0];
};

const findUser = async (email) => {
  // console.log('MODEL findUser email', email);
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  // console.log('MODEL findUser user', user);
  return user;
};
module.exports = { 
  createUser,
  findUser,
};
