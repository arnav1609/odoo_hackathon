const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes"); // ✅ match filename

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/admin", (req, res, next) => {
  console.log("🔥 /api/admin hit");
  next();
}, adminRoutes);


module.exports = app;
