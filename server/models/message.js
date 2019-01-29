const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  title: String,
  body: String
});

module.exports = mongoose.model('messages', messageSchema);