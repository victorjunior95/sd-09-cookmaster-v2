// const connection = require('./src/Models/connection');
// colocar query do MongoDB
// const addAdmin = () => 
  // connection()
  // .then((db) = 
  // db.collection('users').insertOne(
  //   { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' })
//   ))

// module.exports = addAdmin;

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
