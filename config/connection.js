const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialMediaApiDB';

mongoose.connect(MONGODB_URI);

module.exports = mongoose.connection;