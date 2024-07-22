var express = require('express');
var router = express.Router();
const User = require('../models/users');

// Read all users
router.get('/', async (req, res) => {
  try {
    const products = await User.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;