const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
  },
  reset_password_token:{
    type:String
  },
  path:{
    type: String,
  },
  reset_password_token_expire_time:{
    type: Date,
  }
});

module.exports = mongoose.model("user", userSchema);