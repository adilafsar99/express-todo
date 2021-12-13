const express = require("express");
const app = express();
app.use(express.json());
app.use('/', require('./router'));

const mongoose = require('./config/db');
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected.");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000.");
});