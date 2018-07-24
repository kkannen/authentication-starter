const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },

  phone: {
    type: String
  },

  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("User", userSchema);
