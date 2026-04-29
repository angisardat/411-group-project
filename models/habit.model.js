const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  streak: Number
});

module.exports = mongoose.model("Habit", habitSchema);