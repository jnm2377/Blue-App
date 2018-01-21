const mongoose = require('mongoose');


const dailySchema = mongoose.Schema({
  date: {type: String, required: true},
  goal: {type: Number, required: true},
  totalIntake: {type: Number, required: true},
  percentageToGoal: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Daily', dailySchema);
