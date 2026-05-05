const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");
let completedDates = [];

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function drawCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.textContent = `${months[month]} ${year}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Week headers
  weekDays.forEach(day => {
    const header = document.createElement("div");
    header.classList.add("weekday");
    header.textContent = day;
    calendar.appendChild(header);
  });

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    calendar.appendChild(empty);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = d;

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    completedDates.forEach(cd => {
      if (
        cd.getDate() === d &&
        cd.getMonth() === month &&
        cd.getFullYear() === year
      ) {
        day.classList.add("completed-day");
      }
    });

    calendar.appendChild(day);
  }
}

// feature does not work correctly
function loadCalendar() {
  fetch("/api/habits")
    .then(res => res.json())
    .then(habits => {

      completedDates = [];

      habits.forEach(habit => {
        if (habit.completedDates) {
          habit.completedDates.forEach(date => {
            completedDates.push(new Date(date));
          });
        }
      });

      drawCalendar(currentDate);
    });
}

// Navigation
prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar();
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar();
};

// Initial render
loadCalendar();