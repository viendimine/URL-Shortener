const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(express.json());
app.use("/api", urlRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
