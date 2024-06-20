const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");
//Database connection
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "BloodGlucose1";

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
  db.collection("BG-Current")
    .find()
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

//adds a BG to the site
app.post("/addBG", (request, response) => {
  // console.log(request);
  const easternTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  db.collection("BG-Current")
    .insertOne({
      BGDate: easternTime,
      BGSugar: request.body.BGSugar,
    })
    .then((result) => {
      console.log("New BG Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

//deletes  from db
app.delete("/deleteBG", (request, response) => {
  //console.log(id)
  let id = request.body._id;
  console.log(request.body._id);
  db.collection("BG-Current")
    .deleteOne({ _id: ObjectId(id) })
    .then((result) => {
      console.log(result);
      console.log("Sucessfully deleted one");
      response.json("BG Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on port ${PORT}`);
});
