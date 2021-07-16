const connection = require('./connection');

class User {
  constructor(user) {
    this.collection = 'users';
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }

  create() {
    const { collection, ...user } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((col) => col.insertOne({ ...user, role: 'user' }))
      .then((result) => result.ops[0]);
  }
}

module.exports = User;
