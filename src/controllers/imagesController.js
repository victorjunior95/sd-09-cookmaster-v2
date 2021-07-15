const express = require('express');

const router = express.Router();

router.get('/:file', async (req, res) => {
  const { file } = req.params;
  console.log('ctrlimg11', file);
  res.sendFile(file, { root: './src/uploads' });
});

module.exports = router;