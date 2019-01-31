const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  title: String,
  body: String,
  date: Date
});

module.exports = messageSchema;