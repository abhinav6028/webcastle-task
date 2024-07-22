var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'abcd';

router.post('/signup', async function (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req?.body?.password, 10)
    const newDocument = new User({ username: req?.body?.username, password: hashedPassword });
    await newDocument.save();
    res.status(201).send(newDocument);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async function (req, res, next) {
  try {

    const user = await User.findOne({ username: req?.body?.username });
    if (!user) {
      res.status(400).send('Invalid User');
    } else {
      const validPassword = await bcrypt.compare(req?.body?.password, user?.password);
      if (validPassword) {
        const payload = {
          id: user._id,
          username: user.username
        }
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ token });
      } else {
        res.status(400).send('Invalid Username or Password');
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
