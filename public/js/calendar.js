const calendar = document.getElementById("calendar");

const year = new Date().getFullYear();

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

months.forEach((month, index) => {
  const monthDiv = document.createElement("div");
  monthDiv.classList.add("month");

  const title = document.createElement("h3");
  title.textContent = month;

  const daysGrid = document.createElement("div");
  daysGrid.classList.add("days");

  const daysInMonth = new Date(year, index + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = d;
    daysGrid.appendChild(day);
  }

  monthDiv.appendChild(title);
  monthDiv.appendChild(daysGrid);
  calendar.appendChild(monthDiv);
});