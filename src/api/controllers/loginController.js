const express = require('express');

const router = express.Router();

const loginServices = require('../services/loginService');

const invalidStatus = 401;
const sucessStatus = 200;

router.post('/', async (req, res) => {
  const { body } = req;

  const validatedLoginInfos = await loginServices.validateLoginInfos(body);

  if (validatedLoginInfos.isJoi) {
    return res.status(invalidStatus).send({
      message: 'All fields must be filled',
    });
  }

  if (validatedLoginInfos.message) {
    return res.status(invalidStatus).send(validatedLoginInfos);
  }

  res.status(sucessStatus).json({ token: validatedLoginInfos });
});

module.exports = router;
