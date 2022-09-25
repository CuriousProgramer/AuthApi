const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {})
  .then((res) => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log("Failed to connect to the database", err);
  });
const server = app.listen(process.env.PORT, () => {
  console.log("App is runnning on port ", process.env.PORT);
});
