// const express = require("express");
// const app = express();
// const MongoClient = require("mongodb").MongoClient;
// const PORT = 2100;
// require("dotenv").config();
// const cors = require("cors");
// const { ObjectId } = require("mongodb");
// //Database connection
// let db,
//   dbConnectionStr = process.env.DB_STRING,
//   dbName = "BloodGlucose1";

// //Mongodb connection
// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
//   (client) => {
//     console.log(`Connected to ${dbName} Database`);
//     db = client.db(dbName);
//   }
// );

// app.set("view engine", "ejs");
// app.set("port", PORT);

// //connects to Public folder containing css and js files
// app.use(express.static("Public")),
//   app.use(express.urlencoded({ extended: true })),
//   app.use(express.json());

// app.get("/", (request, response) => {
//   db.collection("BG-Current")
//     .find()
//     .toArray()
//     .then((data) => {
//       response.render("index.ejs", { info: data });
//     })
//     .catch((error) => console.error(error));
// });

// //adds a BG to the site
// app.post("/addBG", (request, response) => {
//   // console.log(request);
//   const easternTime = new Date().toLocaleString("en-US", {
//     timeZone: "America/New_York",
//   });
//   db.collection("BG-Current")
//     .insertOne({
//       BGDate: easternTime,
//       BGSugar: request.body.BGSugar,
//     })
//     .then((result) => {
//       console.log("New BG Added");
//       response.redirect("/");
//     })
//     .catch((error) => console.error(error));
// });

// //deletes  from db
// app.delete("/deleteBG", (request, response) => {
//   //console.log(id)
//   let id = request.body._id;
//   console.log(request.body._id);
//   db.collection("BG-Current")
//     .deleteOne({ _id: ObjectId(id) })
//     .then((result) => {
//       console.log(result);
//       console.log("Sucessfully deleted one");
//       response.json("BG Deleted");
//     })
//     .catch((error) => console.error(error));
// });

// app.listen(process.env.PORT || PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2100;
require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");

// Database connection variables
let db;
const dbConnectionStr = process.env.DB_STRING;
const dbName = "BloodGlucose1";

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Public")); // Serve static files from Public directory
app.set("view engine", "ejs");
app.set("port", PORT);

// MongoDB connection and server start
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName); // Set the database instance

    app.get("/", (request, response) => {
      db.collection("BG-Current")
        .find()
        .toArray()
        .then((data) => {
          response.render("index.ejs", { info: data });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          response.status(500).send("Error fetching data from database");
        });
    });

    app.post("/addBG", (request, response) => {
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
        .catch((error) => {
          console.error("Error adding BG:", error);
          response.status(500).send("Error adding BG to database");
        });
    });

    app.delete("/deleteBG", (request, response) => {
      let id = request.body._id;
      db.collection("BG-Current")
        .deleteOne({ _id: ObjectId(id) })
        .then((result) => {
          console.log("Successfully deleted one BG");
          response.json("BG Deleted");
        })
        .catch((error) => {
          console.error("Error deleting BG:", error);
          response.status(500).send("Error deleting BG from database");
        });
    });

    // Starting server
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
