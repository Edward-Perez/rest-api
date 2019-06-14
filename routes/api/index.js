const express = require('express');
const router = express.Router();

// API Users 
router.use('/users', require('./users'));

// API Courses
router.use('/courses', require('./courses'));

module.exports = router;