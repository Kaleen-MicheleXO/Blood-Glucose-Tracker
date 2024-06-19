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

// const express = require("express");
// const app = express();
// const MongoClient = require("mongodb").MongoClient;
// require("dotenv").config();
// const { ObjectId } = require("mongodb");

// // Database connection
// let db;
// const dbConnectionStr = process.env.DB_STRING;
// const dbName = "BloodGlucose1";

// // MongoDB connection
// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log(`Connected to ${dbName} Database`);
//     db = client.db(dbName);

//     // Middleware setup
//     app.set("view engine", "ejs");

//     app.use(express.static("Public"));
//     app.use(express.urlencoded({ extended: true }));
//     app.use(express.json());

//     // Routes
//     app.get("/", async (request, response) => {
//       try {
//         const data = await db.collection("BG-Current").find().toArray();
//         response.render("index.ejs", { info: data });
//       } catch (error) {
//         console.error(error);
//         response.status(500).send("Internal Server Error");
//       }
//     });

//     app.post("/addBG", async (request, response) => {
//       try {
//         const easternTime = new Date().toLocaleString("en-US", {
//           timeZone: "America/New_York",
//         });
//         await db.collection("BG-Current").insertOne({
//           BGDate: easternTime,
//           BGSugar: request.body.BGSugar,
//         });
//         console.log("New BG Added");
//         response.redirect("/");
//       } catch (error) {
//         console.error(error);
//         response.status(500).send("Failed to add BG");
//       }
//     });

//     app.delete("/deleteBG", async (request, response) => {
//       try {
//         let id = request.body._id;
//         console.log(request.body._id);
//         await db.collection("BG-Current").deleteOne({ _id: ObjectId(id) });
//         console.log("Successfully deleted one");
//         response.json("BG Deleted");
//       } catch (error) {
//         console.error(error);
//         response.status(500).send("Failed to delete BG");
//       }
//     });

//     // Start the server
//     const PORT = process.env.PORT || 2100;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database", error);
//     process.exit(1); // Exit the process with a failure
//   });

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { ObjectId } = require("mongodb");

// Verify environment variable
const dbConnectionStr = process.env.DB_STRING;
console.log("DB Connection String:", dbConnectionStr); // Debugging output

if (!dbConnectionStr) {
  console.error("DB_STRING environment variable is not set");
  process.exit(1);
}

let db;
const dbName = "BloodGlucose1";

MongoClient.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Enable TLS/SSL
  tlsAllowInvalidCertificates: true, // Allow invalid certificates (use with caution)
})
  .then((client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);

    app.set("view engine", "ejs");

    app.use(express.static("Public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", async (request, response) => {
      try {
        const data = await db.collection("BG-Current").find().toArray();
        response.render("index.ejs", { info: data });
      } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
      }
    });

    app.post("/addBG", async (request, response) => {
      try {
        const easternTime = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        });
        await db.collection("BG-Current").insertOne({
          BGDate: easternTime,
          BGSugar: request.body.BGSugar,
        });
        console.log("New BG Added");
        response.redirect("/");
      } catch (error) {
        console.error(error);
        response.status(500).send("Failed to add BG");
      }
    });

    app.delete("/deleteBG", async (request, response) => {
      try {
        let id = request.body._id;
        console.log(request.body._id);
        await db.collection("BG-Current").deleteOne({ _id: ObjectId(id) });
        console.log("Successfully deleted one");
        response.json("BG Deleted");
      } catch (error) {
        console.error(error);
        response.status(500).send("Failed to delete BG");
      }
    });

    // Use the PORT environment variable provided by Render
    const PORT = process.env.PORT || 3000; // Use 3000 as a fallback for local development
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
