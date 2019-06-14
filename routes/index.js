const express = require('express');
const router = express.Router({ strict: true });

// Home
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// API Routes
router.use('/api', require('./api'));

module.exports = router;