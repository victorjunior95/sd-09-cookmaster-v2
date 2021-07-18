const bodyParser = require('body-parser');
const app = require('./app');
const userController = require('../controllers/usersController');
const recipeController = require('../controllers/recipeController');
const findUser = require('../middlewares/findUser');
const validateLogin = require('../middlewares/validateToken');

const PORT = 3000;

app.use(bodyParser.json());
 
// create user

app.post('/users', findUser.findUser, userController.postUserController);

// login

app.post('/login', findUser.checkUser, userController.loginController);

// create recipe

app.post('/recipes', validateLogin.validateToken, recipeController.postRecipeController);

// listing all recipes

app.get('/recipes', recipeController.getRecipeController);

// get one recipe

app.get('/recipes/:id', recipeController.getRecipeByIdController);

// edit recipe

app.put('/recipes/:id', 
  validateLogin.validateToken,
  recipeController.editRecipeController);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

// pendiente terminar la camada service, model, controller de la primera request de recetas