const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  completedDate: Date
});

module.exports = mongoose.model("Habit", habitSchema);