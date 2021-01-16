const express = require("express");
const multer = require("multer");
var mongodb = require("mongodb");
const fs = require("fs");
const app = express();
const port = 2000;

app.set("port", port);
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./example/uploads");
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("photo", "User", 5);

app.get("/", function (request, response) {
  response.sendFile("/example/index.html");
});

app.get("/students", function async(request, response) {
  var url = "mongodb+srv://aas:codeworks@aas.pwwb5.mongodb.net/";
  const result = [];

  mongodb.MongoClient.connect(url, async (err, client) => {
    var collection = client.db("AAS").collection("users");
    const cursor = await collection.find({}).toArray();
    response.end(JSON.stringify(cursor));
  });
});

app.post("/upload", function (request, response) {
  const files = [];
  upload(request, response, function (err) {
    if (err) {
      console.log("Error Occured", err);
      return;
    }
    for (let i = 0; i < request.files.length; i++) {
      let userImage =
        "data:" +
        request.files[i].mimetype +
        ";base64," +
        new Buffer(fs.readFileSync(request.files[i].path)).toString("base64");

      files.push(userImage);
    }
    const user = {
      name: "Matthieu",
      reference_images: files,
    };
    console.log(user);
    response.end("Your Files Uploaded");
    console.log("Photo Uploaded");
  });
});

const server = app.listen(port, function () {
  console.log("Listening on port " + server.address().port);
});
