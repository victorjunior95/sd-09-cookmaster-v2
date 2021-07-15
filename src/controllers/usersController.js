const express = require('express');

const router = express.Router();
// const { ObjectId } = require('mongodb');

// codigo de res em algarismos romanos
// const cc = 200;
const cci = 201;
// const z = 0;
// const cdxxii = 422;
const cd = 400;
// const cdiv = 404;
const cdix = 409;

const {
  createUser,
  checkName,
  checkEmal,

} = require('../services/usersService');

const invalideEnties = 'Invalid entries. Try again.';
const alreadRegistered = 'Email already registered';

router.post('/', checkName, checkEmal, async (req, res) => {
  const result = await createUser(req.body);
  if (!result || result.message === invalideEnties) {
    return res.status(cd).json(result);  
  } if (result.message === alreadRegistered) { return res.status(cdix).json(result); }
  return res.status(cci).json(result);
});

router.get('/', async (req, res) => {
  res.send('get');
});
router.put('/', async (req, res) => {
  res.send('put');
});
router.delete('/', async (req, res) => {
  res.send('delete');
});

module.exports = router;