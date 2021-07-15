const express = require('express');
const router = express.Router();
const multer = require('multer');
const {status, message} = require('../services/statusAndMessages');

const storage = require('../config/multerConfigV1');

const upload = multer({storage});

const uploadMax = 5;
const STATUS_OK = 200;

router.post('/teste', upload.array('file', uploadMax), (req, res) =>
  res.json({message: 'arquivo recebido'}).status(status.OK)
);

module.exports = router;
