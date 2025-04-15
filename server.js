require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const authRoutes = require('./router/authRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

const job = cron.schedule("*/15 * * * *", () => {
  console.log("Cron job executed: Running every 15 minutes.");
}, { scheduled: false });

job.start();

// Check for required environment variables
if (!DB_URI || !PORT || !process.env.JWT_SECRET) {
  console.error("❌ Error: Missing environment variables (DB_URI, PORT, JWT_SECRET)");
  process.exit(1);
}

mongoose.connect(DB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
