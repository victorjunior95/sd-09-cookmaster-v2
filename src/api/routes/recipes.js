const express = require('express');
const Controllers = require('../controllers/RecipesController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, Controllers.create);
route.get('/', Controllers.getAll);
route.get('/:id', Controllers.getById);
route.put('/:id', validate.token, Controllers.update);
route.delete('/:id', validate.token, Controllers.remove);
route.put('/:id/image', validate.token, Controllers.putImage);

module.exports = route;