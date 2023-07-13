const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lifeSchema = new Schema({
    title: String,
    date: Date,
    description: String,
    author: String,
    attachments: [String]
  });

module.exports = mongoose.model('Life', lifeSchema);
