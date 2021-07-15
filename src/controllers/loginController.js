const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { checkUser } = require('../services/loginService');

const cdi =401;
const cc =200;


router.post('/', async(req, res) => {
  const  result = await checkUser(req.body);
  const dinamic = !result|| result.message? cdi:cc;

  res.status(dinamic).send(result);
});

router.get('/', async(req, res) => {
  res.send('get');
});
router.put('/', async(req, res) => {
  res.send('put');
});
router.delete('/', async(req, res) => {
  res.send('delete');
});



module.exports = router;