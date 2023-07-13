// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  displayPicture: String,
  hasPaid: Boolean,
  memorials: [{ type: Schema.Types.ObjectId, ref: 'Memorial' }]
});

module.exports = mongoose.model('User', userSchema);
