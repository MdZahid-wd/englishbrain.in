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
  country: String,
  state: String,
  postcode: String,
});
module.exports = mongoose.model("students", student);
