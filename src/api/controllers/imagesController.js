const express = require('express');

const router = express.Router();
const path = require('path');

const sucessStatus = 200;
const uploadsPath = path.resolve(__dirname.replace('/api/controllers', '/uploads'));

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(path);
  const image = `${uploadsPath}/${id}`;
  res.status(sucessStatus).sendFile(image);
});

module.exports = router;
