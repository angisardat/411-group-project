const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("Habit", habitSchema);