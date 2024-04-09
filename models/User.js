const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isProfilePublic: {
    type: Boolean,
    default: true
  },
  profile: {
    photo: String,
    name: String,
    bio: String,
    phone: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
