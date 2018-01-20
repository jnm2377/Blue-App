const mongoose = require('mongoose');


const inputSchema = mongoose.Schema({
  time: {type: String, required: true},
  intake: {type: Number, required: true},
  daily: {type: mongoose.Schema.Types.ObjectId, ref: 'Daily'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Input', inputSchema);
