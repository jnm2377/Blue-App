const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: String
});

//HASHES PASSWORD BEFORE SAVING USER
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    const hashedPass = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = hashedPass;
  }
  next();
})


//AUTHENTICATE PASSWORD
userSchema.methods.auth = function(password) {
  return bcrypt.compareSync(password, this.password); //will return true or false
}

module.exports = mongoose.model('User', userSchema);
