// models/Theme.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
  backgroundImg: String,
  backgroundColor: String,
  textColor: String,
  thumbnail: String,
  tags: String,
});

module.exports = mongoose.model('Theme', themeSchema);
