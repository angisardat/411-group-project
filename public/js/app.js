// Load from localStorage or default values
let habits = JSON.parse(localStorage.getItem("habits")) || [];
let streak = JSON.parse(localStorage.getItem("streak")) || 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate") || null;

// DOM Elements
const habitList = document.getElementById("habitList");
const completedCountEl = document.getElementById("completedCount");
const streakEl = document.getElementById("streak");
const addBtn = document.getElementById("addBtn");

// Save to localStorage
function saveData() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("streak", JSON.stringify(streak));
  localStorage.setItem("lastCompletedDate", lastCompletedDate);
}

// Render UI
function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    // Habit name
    const span = document.createElement("span");
    span.textContent = habit.name;
    if (habit.completed) span.classList.add("completed");

    // Button container (so buttons sit side-by-side)
    const actions = document.createElement("div");

    // Done / Undo button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = habit.completed ? "Undo" : "Done";
    doneBtn.style.width = "70px";
    doneBtn.onclick = () => toggleHabit(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.width = "40px";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.style.background = "#e74c3c";

    deleteBtn.onclick = () => {
    habits.splice(index, 1); // remove habit
    saveData();
    renderHabits();
    };

    // Append buttons
    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    // Add to list item
    li.appendChild(span);
    li.appendChild(actions);

    habitList.appendChild(li);
    });

updateStats();
}

// Update stats
function updateStats() {
const completed = habits.filter(h => h.completed).length;
completedCountEl.textContent = completed;

streakEl.textContent = streak + " days";
}

// Add Habit
addBtn.addEventListener("click", () => {
  const input = document.getElementById("habitInput");
  const value = input.value.trim();

  if (value === "") return;

  habits.push({ name: value, completed: false });
  input.value = "";

  saveData();
  renderHabits();
});

// Toggle Habit
function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;

  const allCompleted = habits.length > 0 && habits.every(h => h.completed);

  const today = new Date().toDateString();

if (allCompleted) {
  if (!lastCompletedDate) {
    // First time ever completing habits
    streak = 1;
  } else {
    const lastDate = new Date(lastCompletedDate);
    const diffTime = new Date(today) - lastDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      // Perfect streak continuation
      streak += 1;
    } else if (diffDays > 1) {
      // Missed a day → reset streak
      streak = 1;
    }
    // if diffDays === 0 → same day → DO NOTHING
  }

  lastCompletedDate = today;
}

  saveData();
  renderHabits();
}

// Initial Load
renderHabits();