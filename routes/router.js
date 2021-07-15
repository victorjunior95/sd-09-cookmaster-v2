const express = require('express');

const router = express.Router();

router.use('/', Controller);
router.use('/', Controller);

router.use((error, _req, res, _next) => res.status(error.code).json(error.err));

module.exports = router;
