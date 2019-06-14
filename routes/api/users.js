const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { authUser } = require('../../controller/authenticate');

// Response JSON User Info
router.get('/', authUser, (req, res, next) => {
  const { firstName, lastName, emailAddress } = req.user;
  res.status(200).json({ firstName, lastName, emailAddress });
});

// Create New User 
router.post('/', async (req, res, next) => {
  const userInfo = await req.body;
  User.create(userInfo)
  .then(() => res.location('/api/users').status(201).end())
  .catch(err => {
    err.message = err.message || err.errors[0].message;
    err.status = 400;
    next(err);
  });
});


module.exports = router;