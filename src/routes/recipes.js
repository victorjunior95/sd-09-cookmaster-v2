const express = require('express');
const multer = require('multer');
const validateToken = require('../services/validateToken');
const recipes = require('../controllers/recipes');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/recipes', upload.single('arquivo'), recipes.getAllRecipes);

module.exports = router;