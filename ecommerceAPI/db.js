
const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/ecommerce';

mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;
