const recipes = require('../models/recipes');

const create = (recipe, { _id: userId }) => recipes.create(recipe, userId)
  .then((data) => ({ status: 201, recipe: data }));

const getAll = () => recipes.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => recipes.getById(id).then((data) => ({ status: 200, data }));

const update = (id, recipe, { _id: userId }) => recipes.update(id, recipe, userId)
  .then(() => ({ status: 200, userId }));

const remove = (id) => recipes.remove(id).then(() => ({ status: 204 }));

const putImage = (id, path) => recipes.putImage(id, `localhost:3000/${path}`)
  .then(() => recipes.getById(id).then((data) => ({ status: 200, data })));

module.exports = { create, getAll, getById, update, remove, putImage };
