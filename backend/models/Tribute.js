const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tributeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  description: String
});

module.exports = mongoose.model('Tribute', tributeSchema);
