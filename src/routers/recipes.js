const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../api/auth/validateJWT'); 

const router = express.Router();

const recipesController = require('../controllers/recipesController');

router.post('/', validateJWT, rescue(recipesController.create));
router.get('/:id', rescue(recipesController.getById));
router.get('/', rescue(recipesController.getAll));
router.put('/:id', validateJWT, rescue(recipesController.updateById));
router.delete('/:id', validateJWT, rescue(recipesController.deleteById));

module.exports = router;