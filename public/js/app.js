let habits = [];
let streak = 0;
let lastCompletedDate = null;

// DOM Elements
const habitList = document.getElementById("habitList");
const completedCountEl = document.getElementById("completedCount");
const streakEl = document.getElementById("streak");
const addBtn = document.getElementById("addBtn");

function loadHabits() {
  fetch("/api/habits")
    .then(res => res.json())
    .then(data => {
      habits = data;
      renderHabits();
    });
}

// Render UI
function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, _id) => {
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
      fetch(`/api/habits/${habit._id}`, {
      method: "DELETE"
    })
    .then(() => {
        loadHabits();
      });
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

addBtn.addEventListener("click", () => {
  const input = document.getElementById("habitInput");
  const value = input.value.trim();

  if (value === "") return;

  fetch("/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: value,
      completed: false,
      streak: 0
    })
  })
  .then(res => res.json())
  .then(() => {
    input.value = "";
    loadHabits(); // refresh from database
  });
});

// Toggle Habit
function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;

  const allCompleted = habits.length > 0 && habits.every(h => h.completed);

  const today = new Date().toDateString();

if (allCompleted) {
  if (streak === 0) {
    streak = 1;
  } else if (!lastCompletedDate) {
    streak = 1;
  } else {
    const lastDate = new Date(lastCompletedDate);
    const diffTime = new Date(today) - lastDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak += 1; // continue streak
    } else if (diffDays > 1) {
      streak = 1; // reset streak
    }
    // diffDays === 0 → same day → do nothing
  }
}

  saveData();
  renderHabits();
}

// Initial Load
loadHabits();