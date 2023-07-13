const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const memorialRoutes = require("./routes/memorialRoutes");
const themeRoutes = require("./routes/themeRoutes");
const stripeRoutes = require("./routes/stripeRoute");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
const mongoURL =
  "mongodb+srv://hafeezullah2023:hafeezullah2023@cluster0.vddszir.mongodb.net/memorials?retryWrites=true&w=majority";
const testDB =
  "mongodb+srv://tan:abcdefg@cluster0.wrwhy.mongodb.net/memorialapp?retryWrites=true&w=majority";
mongoose
  .connect(testDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
app.use(express.static("public"));

// Routes
app.use("/api", userRoutes);
app.use("/api", memorialRoutes);
app.use("/api", themeRoutes);
app.use("/api", stripeRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
