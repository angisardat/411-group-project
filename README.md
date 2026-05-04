# 411-group-project
1. Install code on your machine:
    > Go to Github, open '411-group-project'
    > Select the Green 'Code' button and copy the URL
    > Open a new window in VS Code
    > Select 'Clone Git Repository...'
    > Paste the URL
    > Select a folder location for our project code to live

2. Pull Changes
    (This should be the first thing you do EVERYTIME after opening this project)
    > Locate Source Control (under the magnifying glass)
    > Select the 3 dots '...' (next to the refresh button)
    > Select 'Pull'
    This basically downloads all the code and other members have added to GitHub, this is extremely important to
    make sure you are working on the right code.

3. Push/Commiting your changes
    (Push and commit changes after every few lines of code to avoid big errors)
    > Locate Source Control (under the magnifying glass)
    > In the message section, write a few words on the code/changes you added
    > Press 'Commit'
    > Press 'Sync Changes'
    Pressing Sync Changes sends your changes (and the message) to GitHub

# Habit Tracker App

## 📌 Description

This is a full-stack habit tracking application that allows users to:

* Add habits
* Mark habits as completed
* Delete habits
* Track habits using a MongoDB database

The application uses:

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js with Express
* Database: MongoDB with Mongoose

---

## ⚙️ Required Dependencies

Install all dependencies using:

```bash
npm install
```

Required packages:

* express
* mongoose
* path (built-in)

---

## 🛠️ Setup Instructions

1. Clone or download the project folder

2. Navigate into the project directory:

```bash
cd 411-group-project
```

3. Install dependencies:

```bash
npm install
```

4. Make sure MongoDB is running:

* Open MongoDB Compass OR
* Run:

```bash
mongod
```

5. Ensure your database connection is set correctly in:

```
config/database.js
```

Example:

```js
mongodb://127.0.0.1:27017/habit-tracker
```

---

## ▶️ How to Run the Project

Start the server using:

```bash
node server.js
```

You should see:

```
MongoDB connected successfully
Server running on http://localhost:3000
```

---

## 🌐 Access the App

Open your browser and go to:

```
http://localhost:3000
```

---

## 🧪 Features

* Add a new habit → saved to MongoDB
* Mark habit as done → updates database
* Delete habit → removes from database
* Data persists after page refresh

---

## ⚠️ Notes

* MongoDB must be running before starting the server
* If port 3000 is in use, change it in `server.js`
* If dependencies are missing, rerun:

```bash
npm install
```

---
