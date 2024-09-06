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

// Middleware
// this middleware parases the form requests
// and lets us access req.body
app.use(express.urlencoded({ extended: false }));

// In order to create a Fruit

// the client needs to make a request to get a form
// GET request
app.get("/fruits/new", async function (req, res) {
  res.render("fruits/new.ejs");
});

app.get("/fruits", async function (req, res) {
  const allFruitDocs = await FruitModel.find({});
  console.log(allFruitDocs);

  // secondd argument to render is an object
  // we choose the key and value
  // keyname will become variable name inside of the list argument ejs page
  res.render("fruits/index.ejs", { fruitDocs: allFruitDocs });
});

// then the client needs to submit the form with the data representing the new fruit
// POST request
app.post("/fruits", async function (req, res) {
  console.log(req.body, "<- contents of the form");
  // take the contents of the form and put them in the database
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // use our model to add it to the database!
  const createdFruit = await FruitModel.create(req.body);
  console.log(createdFruit);
  res.redirect("/fruits/new"); // we always redirect to the route we want the user to see
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
