const { ObjectID } = require('mongodb');
const connection = require('./connection');

class Recipe {
  constructor(recipe) {
    this.collection = 'recipes';
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.preparation = recipe.preparation;
    this.id = recipe.id;
  }

  async create(userId) {
    const { collection, ...recipeData } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((col) => col.insertOne({ ...recipeData, userId }))
      .then((result) => result.ops[0]);
  }

  getAll() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find().toArray());
  }

  async getById() {
    if (!ObjectID.isValid(this.id)) return null;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.findOne({ _id: ObjectID(this.id) }))
      .then((result) => result || {});
  }
}

module.exports = Recipe;
