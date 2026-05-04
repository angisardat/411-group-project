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
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {

    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

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
    doneBtn.onclick = () => toggleHabit(habit);

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
    })
  })
  .then(res => res.json())
  .then(() => {
    input.value = "";
    loadHabits(); // refresh from database
  });
});

// Toggle Habit
function toggleHabit(habit) {
  fetch(`/api/habits/${habit._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: !habit.completed,
      completedDate: !habit.completed ? new Date() : null
  })
  })
  .then(res => {
    console.log("PUT response:", res);
    return res.json();
  })
  .then(data => {
    console.log("Updated habit:", data);
    loadHabits();
  })
  .catch(err => {
    console.error("PUT error:", err);
  });
}

// Initial Load
loadHabits();