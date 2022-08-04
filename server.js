const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2100;
require("dotenv").config();
const cors = require("cors");
//Database connection
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "Blood-Suger";

//Mongodb connection
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.set("port", PORT);
//connects to Public folder containing css and js files
app.use(express.static("Public")),
  app.use(express.urlencoded({ extended: true })),
  app.use(express.json());

app.get("/", (request, response) => {
  db.collection("Current-BG")
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

//adds a BG to the site
app.post("/addBG", (request, response) => {
  // console.log(request);
  db.collection("Current-BG")
    .insertOne({
      BGDate: new Date().toString().slice(0,16),
      BGTime: request.body.BGTime,
      BGSugar: request.body.BGSugar,
      likes: 0,
    })
    .then((result) => {
      console.log("New BG Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
    
});




//deletes  from db
app.delete("/deleteBG", (request, response) => {
  console.log(request);
  db.collection("Current-BG")
    .deleteOne({ BGDate: new Date().toString().slice(0,16)})
    .then((result) => {
      console.log("Sucessfully deleted one");
      response.json("Song Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// BGDate: request.body.BGDate,
