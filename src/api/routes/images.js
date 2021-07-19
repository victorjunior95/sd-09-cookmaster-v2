const router = require('express').Router();
const { imagesController } = require('../controllers');

router.use('/:image', imagesController.getByFileName);

module.exports = router;
