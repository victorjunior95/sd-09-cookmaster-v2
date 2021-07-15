const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/users', UsersController.list);
  
router.post('/users', UsersController.register);

router.use((err, _req, res, _next) => {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({
      error: {
        message: 'Internal server error',
      },
    });
  });

module.exports = router;