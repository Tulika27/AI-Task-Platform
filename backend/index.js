require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

// 🔥 DB CONNECT
connectDB();

// 🔥 MIDDLEWARES
app.use(express.json());

// CORS FIX (IMPORTANT)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// 🔥 ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 SERVER START
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});