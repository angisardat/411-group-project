const path = require("path");
const express   = require("express");
const connectDB = require("./config/database");
const Habit = require("./models/habit.model");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

// GET all habits
app.get("/api/habits", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// POST new habit
app.post("/api/habits", async (req, res) => {
  const newHabit = await Habit.create(req.body);
  res.json(newHabit);
});

// PUT (changes habit to done/not done)
app.put("/api/habits/:id", async (req, res) => {
  const completed = req.body.completed;
  const completedDates = req.body.completedDates;

  try {
    const updated = await Habit.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          completed: completed,
          completedDates: completedDates
        }
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Error updating habit" });
  }
});

// DELETE habit
app.delete("/api/habits/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});