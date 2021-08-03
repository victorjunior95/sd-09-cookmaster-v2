const express = require('express');
const path = require('path');
// const imagesController = require('../controllers/imagesController');

const router = express.Router();

router.get('/:id.jpeg', (req, res, _next) => {
  const { id } = req.params;
  const imagepath = path.join(__dirname, '..', 'uploads', `${id}.jpeg`);
  res.status(200).sendFile(imagepath);
});
router.get('/', (req, res, _next) => {
  res.status(200).json('teste');
});

module.exports = router;