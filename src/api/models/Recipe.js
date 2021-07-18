const connection = require('./connection');

class Recipe {
  constructor(recipe) {
    this.collection = 'recipes';
    this.name = recipe.name;
    this.ingredients = recipe.ingredients;
    this.preparation = recipe.preparation;
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
}

module.exports = Recipe;
