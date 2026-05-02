require("dotenv").config(); 
const path = require("path");
const express   = require("express");
const connectDB = require("./config/database");
const Habit = require("./models/habit.model");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}` 

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
  const habit = await Habit.findById(req.params.id); 

  let newStreak = habit.streak; 
  if(req.body.completed === true)
  {
    newStreak = habit.streak + 1; 
  }

  else if(req.body.completed === false)
  {
    newStreak = Math.max(0, habit.streak - 1); 
  }

  const updated = await Habit.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE habit
app.delete("/api/habits/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.post("/api/suggest", async(req, res) => 
{ 
  try{
  const result = await fetch(URL,
    {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Can you please suggest habits based on ${req.body.habits}. Please 
              keep your response to 30 words max.`
            }]
          }]
        })
    })
  const data = await result.json(); 
  res.json(data); 
  }

  catch(err)
  {
    console.error("Gemini error:" + err); 
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});