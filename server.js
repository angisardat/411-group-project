const path = require("path");
const express   = require("express");
const connectDB = require("./config/database");
const Student   = require("./models/students.model"); // change this line to new database

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});