const mongoose = require("mongoose");

const student = mongoose.Schema({
  email: String,
  name: String,
  class: Number,
  phone: String,
  password1: String,
  address: String,
  course: Array,
  url: String,
});
module.exports = mongoose.model("students", student);
