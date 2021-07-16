const bodyParser = require('body-parser');
const app = require('./app');
const userController = require('../controllers/usersController');
const findUser = require('../middlewares/findUser');

const PORT = 3000;

app.use(bodyParser.json());

// create user

app.post('/users', findUser, userController.postUserController);

// login

app.post('/login', userController.loginController);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
