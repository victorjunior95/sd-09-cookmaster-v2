const recipeService = require('../service/recipe');

const newRecipeController = async (request, response, next) => {
  try {
    const newRecipe = request.body;
    const { authorization } = request.headers;
    const { status,
      createdRecipe } = await recipeService.newRecipeService(newRecipe, authorization);
    response.status(status).json({ recipe: createdRecipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newRecipeController,
};

  // console.log(newRecipe);
  /* { name: 'receita correta',
  ingredients: 'Frango e arroz',
  preparation: 'cozinhar até focar ' } */

    // console.log(authorization);
  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwZmM2N2FhYjgxZTgwNTU2NGFlODdjYSIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYyNzE1NTA1MiwiZXhwIjoxNjI3MjQxNDUyfQ.L8LmWf3x-3LYIt-8oNPfsBDkvcwhc7jumTtcks9K7gw */