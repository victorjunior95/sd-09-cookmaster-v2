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

const validateToken = async (token) => {
  if (!token) throw messages.UNAUTHORIZED_MISSING_AUTH_TOKEN;
    // console.log(token, secret);
    const payload = jwt.verify(token, secret); /* Decodifica o Token */
    if (!payload) throw messages.UNAUTHORIZED_JWT_MALFORMED;

    const { email } = payload.data;
    const user = await userModel.findUserByEmailModel(email);
    if (!user) throw messages.BAD_REQUEST_INVALID_ENTRIES;
    return payload.data;
};

const newRecipeService = async (newRecipe, authorization) => {
    const dataUser = await validateToken(authorization);
    const { error } = recipeSchema.validate(newRecipe); 
    if (error) throw messages.BAD_REQUEST_INVALID_ENTRIES;
    const { _id: userId } = dataUser;
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