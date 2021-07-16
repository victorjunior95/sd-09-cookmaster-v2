const express = require('express');

const router = express.Router();
// const { ObjectId } = require('mongodb');
const validaJWT = require('../api/auth/validateJWT');

// codigo de res em algarismos romanos
// const cc = 200;
const cci = 201;
// const z = 0;
const cdiii = 403;
const cd = 400;
// const cdiv = 404;
const cdix = 409;

const {
  createUser,
  checkName,
  checkEmal,
  createUserAdmin,

} = require('../services/usersService');

const invalideEnties = 'Invalid entries. Try again.';
const alreadRegistered = 'Email already registered';
const onlyAdmins = 'Only admins can register new admins';

router.post('/', checkEmal, checkName, async (req, res) => {
  const result = await createUser(req.body);
  if (!result || result.message === invalideEnties) {
    return res.status(cd).json(result);  
  } if (result.message === alreadRegistered) { return res.status(cdix).json(result); }
  return res.status(cci).json(result);
});
// +++++++++++++++++ admin user criation ++++++++++++++++++++ //
router.post('/admin', checkEmal, checkName, validaJWT, async (req, res) => {
  const resut = await createUserAdmin(req.body, req.user);
  if (resut.message === onlyAdmins) { return res.status(cdiii).json(resut); }
  if (!resut || resut.message === invalideEnties) {
    return res.status(cd).json(resut);  
  } if (resut.message === alreadRegistered) { return res.status(cdix).json(resut); }
  return res.status(cci).json(resut);
});
router.put('/', async (req, res) => {
  res.send('put');
});
router.delete('/', async (req, res) => {
  res.send('delete');
});

module.exports = router;