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
    const { collection: _, ...recipeData } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.insertOne({ ...recipeData, userId }))
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

  async update() {
    if (!ObjectID.isValid(this.id)) return null;

    const { collection: _, ...recipeData } = this;

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.findOneAndUpdate(
        { _id: ObjectID(this.id) },
        {
          $set: recipeData,
        },
        { returnOriginal: false },
      ))
        .then((result) => result.value || {});
  }
}

module.exports = Recipe;
