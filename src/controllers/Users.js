const { Router } = require('express');
const models = require('../models/Users');
const {
  checkUserData,
  checkUniqueEmail,
} = require('../middlewares');
const userSchemas = require('../schemas');

const Created = '201';

const usersController = Router();

// productsController.get('/', async (_req, res) => {
//   const products = await models.getAll();
//   res.status(OK).json({ products });
// });

usersController.post('/', checkUserData(userSchemas), 
  checkUniqueEmail, async (req, res) => {
    const { name, email, password } = req.body;
    const user = await models.create(name, email, password);
    res.status(Created).json({ user: user.ops[0] });
  });

// productsController.get('/:id', noexist, async (req, res) => {
//   const { id } = req.params;
//   const product = await models.getProduct(id);
//   res.status(OK).json(product);
// });

// productsController.delete('/:id', noexist, async (req, res) => {
//   const { id } = req.params;
//   const product = await models.getProduct(id);
//   const response = await models.del(id);
//   response.result.ok ? res.status(OK).json(product) : '';
// });

// productsController.put('/:id', name, quantP, async (req, res) => {
//   let result = '';
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const product = await models.update(id, name, quantity);
//   product.result.ok ? result = await models.getProduct(id): '';
//   res.status(OK).json(result);
// });

module.exports = usersController;
