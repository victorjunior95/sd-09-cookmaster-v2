const connection = require('./connection');

class User {
  constructor(user) {
    this.collection = 'users';
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

  getByEmail() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.findOne({ email: this.email }));
  }

  async create() {
    const existingUser = await this.getByEmail();

    if (existingUser) return null;

    const { collection, ...user } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((col) => col.insertOne({ ...user }))
      .then((result) => result.ops[0]);
  }

  verify() {
    const { email, password } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.findOne({ email, password }))
      .then((result) => (!result
        ? result
        : {
          name: result.name,
          email: result.email,
          role: result.role,
        }));
  }
}

module.exports = User;
