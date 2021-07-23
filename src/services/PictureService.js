const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');
const RecipesModel = require('../models/RecipesModel');

const SECRET = 'TH!S!S@s3CR3t';

const getUser = async (token) => {
  const payload = jwt.verify(token, SECRET); 
  const currentUser = await UsersModel.findByEmail(payload.email);
  return currentUser;
};

const createObjToReturn = (_id, name, ingredients, preparation, image, userId) => ({
  _id,
  name,
  ingredients,
  preparation,
  image,
  userId,
});

const uploadPicture = async (id, buffer, token) => {
  const currentUser = await getUser(token);
  const currentRecipe = await RecipesModel.find(id);
  const { _id, name, ingredients, preparation, userId } = currentRecipe;
  console.log(currentUser[0]);
  const { _id: currentUserId, role } = currentUser[0];
  console.log(userId, 'user ID', currentUserId);
  if (currentUserId.toString() === userId.toString() || role === 'admin') {
    const filePath = path.join(__dirname, '..', 'uploads', `${_id}.jpeg`); console.log('entrei');
    await fs.writeFile(filePath, buffer.data);
    const image = `localhost:3000/src/uploads/${_id}.jpeg`;
    await RecipesModel.updateImage(id, image);
    const obj = createObjToReturn(id, name, ingredients, preparation, image, currentUserId);
    return { status: 200, result: obj };
  }
  return { status: 401 };
};

module.exports = { uploadPicture };