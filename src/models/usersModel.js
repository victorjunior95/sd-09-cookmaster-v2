const connection = require('./connection');

module.exports = {
  addUser: async (name, email, password) => {
    const newUser = await connection().then((db) =>
      db.collection('users').insertOne({ name, email, password, role: 'user' }));

    return {
      user: {
        name: newUser.ops[0].name,
        email: newUser.ops[0].email,
        role: newUser.ops[0].role,
        _id: newUser.insertedId,
      },
    };
  },

  listAllUsers: async () => {
    const listUsers = await connection().then((db) =>
      db.collection('users').find().toArray());

    return listUsers;
  },

  listUserByEmail: async (email) => {
    const listByEmail = await connection().then((db) =>
      db.collection('users').findOne({ email }));

    return listByEmail;
  },
};
