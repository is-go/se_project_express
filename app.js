const express = require("express");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const cors = require("cors");
const { errors } = require("celebrate");

const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Request logging middleware
app.use(requestLogger);

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use("/", mainRouter);

// Error logging middleware
app.use(errorLogger);

// Celebrate error handling middleware
app.use(errors());

// Custom error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

console.log("hello world!");
