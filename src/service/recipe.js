const joi = require('joi');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const recipeModel = require('../model/recipe');
const status = require('../other/httpCode');
const messages = require('../other/messages');

const recipeSchema = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

const secret = 'cookmaster'; /* segredo */

const validateToken = async (generateToken) => {
  if (!generateToken) throw messages.UNAUTHORIZED_JWT_MALFORMED;
  
  try {
    const decodeToken = jwt.verify(generateToken, secret); /* Decodifica o Token */
    const { email } = decodeToken.data;
    const user = await userModel.findUserByEmailModel(email);
    if (!user) throw messages.UNAUTHORIZED_JWT_MALFORMED;
    return decodeToken.data;
  } catch (error) {
    throw messages.UNAUTHORIZED_JWT_MALFORMED;
  }
};

const newRecipeService = async (newRecipe, authorization) => {
  const result = await validateToken(authorization);
  const { error } = recipeSchema.validate(newRecipe); 
  if (error) throw messages.BAD_REQUEST_INVALID_ENTRIES;
  const { _id: userId } = result;
  const recipe = newRecipe;
  recipe.userId = userId;
  const createdRecipe = await recipeModel.newRecipeModel(newRecipe);

  return {
    status: status.CREATED,
    createdRecipe,
  };
};

module.exports = {
  newRecipeService,
};

    // console.log(decodeToken);
    /* { data:
   { _id: '60fc67aab81e805564ae87ca',
     email: 'erickjacquin@gmail.com',
     role: 'user' },
  iat: 1627155052,
  exp: 1627241452 } */

    // console.log(result);
  /* { _id: '60fc67aab81e805564ae87ca',
  email: 'erickjacquin@gmail.com',
  role: 'user' } */