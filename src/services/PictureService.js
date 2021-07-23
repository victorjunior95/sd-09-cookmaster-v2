const RecipesModel = require('../models/RecipesModel');

const createObjToReturn = ({ id, name, ingredients, preparation, image, userId }) => ({
  _id: id,
  name,
  ingredients,
  preparation,
  image,
  userId,
});

const uploadPicture = async (id) => {
  const currentRecipe = await RecipesModel.find(id);
  const { _id, name, ingredients, preparation, userId } = currentRecipe;
  const image = `localhost:3000/src/uploads/${_id}.jpeg`;
  await RecipesModel.updateImage(id, image);
  const obj = createObjToReturn({ id, name, ingredients, preparation, image, userId });
  return { status: 200, result: obj };
};

module.exports = { uploadPicture };