const { uploadRecipeImage } = require('../Models/recipes');

module.exports = async (id) => {
  const data = await uploadRecipeImage(id);
  if (!data) {
    return { code: 'invalid_data',
    err: { message: 'Wrong id format' } };
  }
  
  return data;
};