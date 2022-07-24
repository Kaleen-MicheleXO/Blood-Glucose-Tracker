const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2100;
require("dotenv").config();
const e = require("cors");

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "Favorite_Music";

//Mongodb connection
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public")),
  app.use(express.urlencoded({ extended: true })),
  app.use(express.json());

app.get("/", (request, response) => {
  db.collection("Music")
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

//adds a song to the site
app.post("/addMusic", (request, response) => {
  console.log(request);
  db.collection("Music")
    .insertOne({
      Song: request.body.Song,
      Artist: request.body.Artist,
      likes: 0,
    })
    .then((result) => {
      console.log("New Song Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});
///updated likes
app.put("/addOneLike", (request, response) => {
  // console.log(request);
  db.collection("Music")
    .updateOne(
      {
        Song: request.body.Song,
        Artist: request.body.Artist,
        likes: request.body.likesS,
      },
      {
        $set: {
          likes: request.body.likesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      response.json("Like Added");
    })
    .catch((error) => console.error(error));
});
app.put("/decreaseLike", (request, response) => {
  // console.log(request);
  db.collection("Music")
    .updateOne(
      {
        Song: request.body.Song,
        Artist: request.body.Artist,
        likes: request.body.likesS,
      },
      {
        $set: {
          likes: request.body.likesS - 1,
        },
      },
      {
        sort: { _id: -1 },
        // upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      response.json("Like Added");
    })
    .catch((error) => console.error(error));
});

//deletes song from db
// app.delete("/deleteSong", (request, response) => {
//   db.collection("Music")
//     .deleteOne({ Song: request.body.Song })
//     .then((result) => {
//       console.log("Sucessfully deleted one");
//       response.json("Song Deleted");
//     })
//     .catch((error) => console.error(error));
// });
//const uri = process.env.MONGODB_URI;
app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on port ${PORT}`);
});
