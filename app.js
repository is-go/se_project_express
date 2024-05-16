const express = require("express");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const cors = require("cors");

const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// app.use((req, res, next) => {
//   req.user = {
//     _id: "6636b1742e780d701c2c505f", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

app.use(cors());

app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log({ PORT });
});

console.log("hello world!");
