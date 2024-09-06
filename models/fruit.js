const mongoose = require("mongoose");

// Just the definition of the model/schema
// WE USE THE MODEL IN OTHER FILES (today in server.js)

//the Schema enforces the shape of the documents
// we create/update in mongodb
//shape refers to the keyNames/Value Datatypes (mongoose syntax for reference)
//for datatypes, Strings, Booleans, Number, etc....
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// we creat the model object~ which we export in order to use in other files
// this object can perform our CRUD operations, .create, .find, .findOne, .findByIdea, .findOneAndUpdate
const FruitModel = mongoose.model("Fruit", fruitSchema);

module.exports = FruitModel;
