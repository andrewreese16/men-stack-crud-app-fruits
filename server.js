const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Importing the model
// model by convention is uppercase and singular in all programing languages
const FruitModel = require("./models/fruit");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", function () {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// ENDPOINTS!!!
// Landing Page aka Root Route
app.get("/", function (req, res) {
  // index.ejs is refrencing views/index.ejs
  // no need to put views ever!
  res.render("index.ejs");
});

app.listen(3000, function () {
  console.log("Server is listening for response on port 3000");
});
